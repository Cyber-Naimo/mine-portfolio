"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color("#3B82F6");
    const color2 = new THREE.Color("#06B6D4");
    const colorWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const t = Math.random();
      const c = t < 0.4 ? color1 : t < 0.7 ? color2 : colorWhite;
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Base auto-rotation + mouse parallax
    ref.current.rotation.y = t * 0.04 + state.pointer.x * 0.22;
    ref.current.rotation.x = Math.sin(t * 0.02) * 0.08 - state.pointer.y * 0.12;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent vertexColors
        size={0.022} sizeAttenuation
        depthWrite={false} opacity={0.7}
      />
    </Points>
  );
}

// Bright accent stars — foreground layer
function StarField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 + 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + state.pointer.x * 0.06;
    ref.current.rotation.x = state.clock.elapsedTime * 0.008 - state.pointer.y * 0.04;
  });

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial
        transparent color="#ffffff"
        size={0.05} sizeAttenuation
        depthWrite={false} opacity={0.55}
      />
    </Points>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (ring1.current) {
      ring1.current.rotation.x = t * 0.12 + py * 0.28;
      ring1.current.rotation.y = t * 0.08 + px * 0.28;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.08 - py * 0.18;
      ring2.current.rotation.z = t * 0.06 + px * 0.18;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.05 + px * 0.22;
      ring3.current.rotation.z = -t * 0.09 - py * 0.22;
    }
  });

  return (
    <>
      <mesh ref={ring1} position={[0, 0, 0]}>
        <torusGeometry args={[2.2, 0.008, 16, 120]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2} position={[0, 0, 0]}>
        <torusGeometry args={[3.2, 0.005, 16, 120]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.15} />
      </mesh>
      {/* Third inner ring — purple accent */}
      <mesh ref={ring3} position={[0, 0, 0]}>
        <torusGeometry args={[1.4, 0.006, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
        <StarField />
        <FloatingRings />
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, #0A0A0A 100%)",
        }}
      />
    </div>
  );
}
