"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function MeshComponent() {
  const fileUrl = "/assets/3D/frog/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}


export function Frog() {
    return (
      <div className="flex justify-center items-center h-screen">
        <Canvas
          className="h-2xl w-2xl"
          camera={{ position: [1, 1, 1.5], fov: 75 }} // Adjust position and field of view as desired
        >
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <MeshComponent />
        </Canvas>
      </div>
    );
  }