
uniform float uFrequency;
uniform float uAmplitude;
uniform float uTime;

varying vec2 vUv;


void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * uFrequency + uTime) * uAmplitude;
    modelPosition.x += cos(modelPosition.y * uFrequency + uTime) * uAmplitude;
    vec4 viewPosition = viewMatrix * modelPosition;
    // viewPosition += 1.0;
    gl_Position = projectionMatrix * viewPosition;

    vUv = uv;
   }