import * as THREE from "three";

// Map VLT (0–100, or 120 = no tint) to overlay alpha.
// Higher VLT = lighter glass = lower alpha.
const vltToAlpha = (vlt: number, minAlpha = 0.02, maxAlpha = 0.92) => {
  if (vlt >= 100 || vlt === 120) return minAlpha; // no tint
  const t = THREE.MathUtils.clamp(vlt / 100, 0, 1);
  // Lerp from dark (maxAlpha) to light (minAlpha)
  return THREE.MathUtils.lerp(maxAlpha, minAlpha, t);
};

export const createSideWindowShaderMaterial = (
  frontVLT: number, // e.g. 70 for 70% VLT (light)
  rearVLT: number,  // e.g. 20 for 20% VLT (dark)
  splitZ = 0        // z where you switch front/rear (tweak per model)
) => {
  const frontAlpha = vltToAlpha(frontVLT);
  const rearAlpha  = vltToAlpha(rearVLT);

  return new THREE.ShaderMaterial({
    uniforms: {
      frontAlpha: { value: frontAlpha },
      rearAlpha:  { value: rearAlpha },
      tintColor:  { value: new THREE.Color(0x000000) }, // neutral gray/black tint
      splitZ:     { value: splitZ },
      fresnelStrength: { value: 0.06 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      varying vec3 vNormalW;
      void main() {
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vNormalW  = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float frontAlpha;
      uniform float rearAlpha;
      uniform vec3  tintColor;
      uniform float splitZ;
      uniform float fresnelStrength;

      varying vec3 vWorldPos;
      varying vec3 vNormalW;

      void main() {
        // Choose front vs rear by world Z (adjust splitZ from JS)
        float useFront = step(splitZ, vWorldPos.z);
        float alpha    = mix(rearAlpha, frontAlpha, useFront);

        // Subtle Fresnel edge to feel like glass
        vec3 V = normalize(cameraPosition - vWorldPos);
        float fresnel = pow(1.0 - max(dot(V, normalize(vNormalW)), 0.0), 3.0);
        float edgeBoost = fresnel * fresnelStrength;

        // Final color: neutral tint with slight edge brightening (keeps it “glassy”)
        vec3 base = mix(vec3(0.0), tintColor, 0.85); // nearly black tint, not blue
        vec3 finalColor = base + edgeBoost;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
};
