import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SphereComp } from "./SphereComp";

export const ThreeDBackground = () => {
  return (
    <Canvas style={{ height: "100vh", position: "fixed", top: 0, left: 0, zIndex: -50 }}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[-2, 5, 2]} />

      <Suspense fallback={null}>
        <SphereComp />
      </Suspense>
    </Canvas>
  );
};
