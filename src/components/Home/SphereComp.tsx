import React from "react";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

export function SphereComp() {
  return (
    <Sphere args={[1, 100, 200]} scale={4}>
      <MeshDistortMaterial color={"#3b82f6"} attach={"material"} wireframe={true} distort={0.5} speed={1.5} roughness={1} />
    </Sphere>
  );
}
