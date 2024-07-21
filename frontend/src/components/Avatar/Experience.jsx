import { FemaleAvatar } from "./HostelWoman";
import { OrbitControls } from "@react-three/drei";

const Experience = () => {
  return (
    <>
      <OrbitControls />
      {/* <group scale={1.4} position-z={0} position-y={-2.0} position-x={0}> */}
      {/* Female Avatar - intensity: 1.8*/}
      <group scale={3.1} position-z={0} position-y={-4.6} position-x={0}>
        <FemaleAvatar />
      </group>
      <ambientLight intensity={2.4} />
    </>
  );
};

export default Experience;
