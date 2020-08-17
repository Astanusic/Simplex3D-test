import React, { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { softShadows, MeshWobbleMaterial, OrbitControls, Sphere } from "drei";
import "./App.css";
import "./imageFadeMaterial";
import img1 from "./assets/tokyo.jpg";
import img2 from "./assets/australia.jpg";
import disp from "./assets/displacement/displacement.jpg";

const SpinningMesh = () => {
  const mesh = useRef(null);
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [
    img1,
    img2,
    disp,
  ]);
  const [hovered, setHover] = useState(false);
  useFrame(
    () =>
      (mesh.current.dispFactor = THREE.MathUtils.lerp(
        mesh.current.dispFactor,
        hovered ? 1 : 0,
        0.1
      ))
  );
  return (
    <mesh
      onPointerMove={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      scale={[3, 3, 1]}
    >
      <planeBufferGeometry attach="geometry" args={[1.5, 2]} />
      <imageFadeMaterial
        ref={mesh}
        attach="material"
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
      />
    </mesh>
  );
};

const App = (props) => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <SpinningMesh />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
