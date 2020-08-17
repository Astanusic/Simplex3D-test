import React, { useRef, useState, Suspense, useMemo } from "react";

import * as THREE from "three";
import { Canvas, useFrame, useLoader, ambientLight } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { shaderMaterial } from "drei";

import "./App.css";

import vertex from "./vertex.glsl";
import fragment from "./fragment.glsl";

import img1 from "./assets/tokyo.jpg";

const Plane = () => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const clock = new THREE.Clock();
  const [texture1] = useLoader(THREE.TextureLoader, [img1]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture1 },
    }),
    []
  );

  useFrame(() => (ref.current.uniforms.uTime.value = clock.getElapsedTime()));

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[0.4, 0.6, 16, 16]} />
      <shaderMaterial
        attach="material"
        ref={ref}
        args={[
          {
            uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
          },
        ]}
      />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas colorManagement camera={{ position: [0, 0, 1], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Plane />
      </Suspense>
    </Canvas>
  );
};

export default App;
