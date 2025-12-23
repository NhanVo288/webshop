import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function CameraLight() {
  const light = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (light.current) {
      light.current.position.copy(camera.position);
    }
  });

  return <directionalLight ref={light} intensity={2} />;
}
