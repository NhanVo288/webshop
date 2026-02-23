import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model({ color, ...props }) {
  const { scene, materials } = useGLTF("/iphone17-1.glb");
  const modelRef = useRef();

  useFrame((state) => {
    modelRef.current.rotation.y += 0.01;
    state.invalidate();
  });

  useEffect(() => {
    Object.values(materials).forEach((m) => {
      if (m.isMeshPhysicalMaterial || m.isMeshStandardMaterial) {
        m.metalness = 1;
        m.roughness = 0.22;
        m.envMapIntensity = 5.5;
        m.reflectivity = 1;
      }

      if (m.color) m.color.set(color);
      m.needsUpdate = true;
    });
  }, [color, materials]);

  return (
    <group ref={modelRef} scale={[0.5, 0.5, 0.5]} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/iphone17-1.glb");
