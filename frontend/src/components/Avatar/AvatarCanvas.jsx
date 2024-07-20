import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
const AvatarCanvas = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 1, 5], fov: 25 }}>
        {/* shadows camera={{ position: [0, 2, 5], fov: 30 }}> */}
        {/* <color attach="background" args={["#ececec"]} /> */}
        <Experience />
      </Canvas>
    </>
  );
};

export default AvatarCanvas;
