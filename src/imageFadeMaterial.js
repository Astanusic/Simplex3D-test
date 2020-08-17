import { extend } from "react-three-fiber";
import { shaderMaterial } from "drei";

const ImageFadeMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,
  `varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(0., 0., 0., 1.);
  }`
);

extend({ ImageFadeMaterial });
