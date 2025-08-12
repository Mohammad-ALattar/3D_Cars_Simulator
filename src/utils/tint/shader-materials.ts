import * as THREE from "three";

export const createSideWindowShaderMaterial = (
  frontSideTintPercent: number,
  rearSideTintPercent: number
) => {
  // For front windows - ensure minimum visibility
  let frontOpacity;
  if (frontSideTintPercent === 0) {
    frontOpacity = 0.95; // Slightly transparent to show it's glass
  } else if (frontSideTintPercent === 100) {
    frontOpacity = 0.30; // Minimum visibility for heavily tinted windows
  } else {
    // Scale between 0.95 and 0.30
    frontOpacity = 0.95 - (frontSideTintPercent / 100) * 0.65;
  }

  // For rear windows - ensure minimum visibility
  let rearOpacity;
  if (rearSideTintPercent === 0) {
    rearOpacity = 0.95; // Slightly transparent to show it's glass
  } else if (rearSideTintPercent === 100) {
    rearOpacity = 0.15; // Very dark but still visible
  } else {
    // Scale between 0.95 and 0.15
    rearOpacity = 0.95 - (rearSideTintPercent / 100) * 0.80;
  }

  return new THREE.ShaderMaterial({
    uniforms: {
      frontSideTint: { value: frontOpacity },
      rearSideTint: { value: rearOpacity },
      baseColor: { value: new THREE.Color(0x222222) }, // Darker base for better glass look
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        vPosition = position;
        vNormal = normal;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float frontSideTint;
      uniform float rearSideTint;
      uniform vec3 baseColor;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      
      void main() {
        // Determine front vs rear based on position
        float wheelbasePosition = vPosition.z;
        float opacity = (wheelbasePosition > -2.0) ? frontSideTint : rearSideTint;

        // Add subtle glass-like effects
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = .0 - abs(dot(vNormal, viewDirection));
        
        // Mix base color with slight blue tint for glass effect
        vec3 glassColor = mix(baseColor, vec3(0.1, 0, 0), 0.2);

        // Add fresnel reflection
        vec3 finalColor = mix(glassColor, vec3(0.2, 0.9, 1.0), 0.1);
        
        gl_FragColor = vec4(finalColor, opacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide, // Ensure both sides are rendered
    depthWrite: false, // Prevent depth writing issues with transparency
  });
};