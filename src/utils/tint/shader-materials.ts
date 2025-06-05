import * as THREE from "three";
export const createSideWindowShaderMaterial = (
  frontSideTintPercent: number,
  rearSideTintPercent: number
) => {
  // For front windows
  let frontOpacity;
  if (frontSideTintPercent === 0) {
    frontOpacity = 1.0;
  } else if (frontSideTintPercent === 100) {
    frontOpacity = 0;
  } else {
    frontOpacity = 1.0 - frontSideTintPercent * 0.005;
  }

  // For rear windows
  let rearOpacity;
  if (rearSideTintPercent === 0) {
    rearOpacity = 1.0;
  } else if (rearSideTintPercent === 100) {
    rearOpacity = 0;
  } else {
    rearOpacity = 1.0 - rearSideTintPercent * 0.005;
  }

  return new THREE.ShaderMaterial({
    uniforms: {
      frontSideTint: { value: frontOpacity },
      rearSideTint: { value: rearOpacity },
      baseColor: { value: new THREE.Color(0x444444) },
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float frontSideTint;
      uniform float rearSideTint;
      uniform vec3 baseColor;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        // In this model, i use position.z to determine front vs rear
        // using the simple threshold approach
        float wheelbasePosition = vPosition.z;
        float tint = (wheelbasePosition > -0.3) ? frontSideTint : rearSideTint;
        gl_FragColor = vec4(baseColor, tint);
      }
    `,
    transparent: true,
  });
};
