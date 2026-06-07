"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Cluster topology ─────────────────────────────────────────────────
interface NodeDef {
  pos: [number, number, number];
  color: string;
  size: number;
  pulse: number;
}

const NODES: NodeDef[] = [
  { pos: [ 0.0,  0.0,  0.0], color: "#3B82F6", size: 0.22, pulse: 0.0 }, // control-plane
  { pos: [-2.2,  0.4, -0.5], color: "#10B981", size: 0.15, pulse: 1.1 }, // worker-1
  { pos: [ 2.0, -0.2, -0.4], color: "#10B981", size: 0.15, pulse: 2.3 }, // worker-2
  { pos: [ 0.3,  1.6, -0.3], color: "#10B981", size: 0.15, pulse: 0.7 }, // worker-3
  { pos: [-1.2, -1.3,  0.2], color: "#06B6D4", size: 0.10, pulse: 1.8 }, // ingress
  { pos: [ 2.6,  0.8,  0.3], color: "#06B6D4", size: 0.10, pulse: 3.1 }, // service-lb
  { pos: [-2.8, -0.5,  0.4], color: "#a78bfa", size: 0.08, pulse: 0.4 }, // pod-1
  { pos: [ 1.0, -1.5, -0.1], color: "#a78bfa", size: 0.08, pulse: 2.6 }, // pod-2
  { pos: [-0.5,  0.3,  1.1], color: "#F59E0B", size: 0.09, pulse: 1.4 }, // etcd
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], // control-plane → workers
  [1, 4], [2, 5], [3, 6], // workers → services / pods
  [0, 8], [1, 7], [2, 7], // etcd + cross-links
  [4, 7], [3, 5],         // service mesh
];

const PPE = 5; // packets per edge
const TOTAL = EDGES.length * PPE;

// ─── Outer grid sphere ────────────────────────────────────────────────
function GridSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.004;
    ref.current.rotation.z = clock.elapsedTime * 0.0025;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[5.2, 2]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.028} wireframe />
    </mesh>
  );
}

// ─── Glowing node (core + 2 halo shells) ─────────────────────────────
function GlowNode({ pos, color, size, pulse }: NodeDef) {
  const groupRef = useRef<THREE.Group>(null);
  const c = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.1 + pulse) * 0.07);
  });

  return (
    <group ref={groupRef} position={pos}>
      {/* Solid core */}
      <mesh>
        <sphereGeometry args={[size, 28, 28]} />
        <meshBasicMaterial color={c} />
      </mesh>
      {/* Inner halo — BackSide trick for soft glow */}
      <mesh>
        <sphereGeometry args={[size * 2.0, 16, 16]} />
        <meshBasicMaterial
          color={c} transparent opacity={0.22}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide} depthWrite={false}
        />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[size * 3.6, 12, 12]} />
        <meshBasicMaterial
          color={c} transparent opacity={0.07}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide} depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Static connection lines ──────────────────────────────────────────
function ConnectionLines() {
  const geo = useMemo(() => {
    const arr = new Float32Array(EDGES.length * 6);
    EDGES.forEach(([a, b], i) => {
      const na = NODES[a].pos, nb = NODES[b].pos;
      arr[i*6]   = na[0]; arr[i*6+1] = na[1]; arr[i*6+2] = na[2];
      arr[i*6+3] = nb[0]; arr[i*6+4] = nb[1]; arr[i*6+5] = nb[2];
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="#60A5FA" transparent opacity={0.14}
        blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </lineSegments>
  );
}

// ─── Animated data packets ────────────────────────────────────────────
function DataPackets() {
  const ptsRef = useRef<THREE.Points>(null);

  // Mutable t-value array (mutated in useFrame, not React state)
  const tVals = useMemo<Float32Array>(() => {
    const arr = new Float32Array(TOTAL);
    EDGES.forEach((_, e) => {
      for (let p = 0; p < PPE; p++) arr[e * PPE + p] = p / PPE;
    });
    return arr;
  }, []);

  // Random per-edge speed (stable across renders)
  const speeds = useMemo<Float32Array>(() => {
    const arr = new Float32Array(EDGES.length);
    for (let i = 0; i < EDGES.length; i++) arr[i] = 0.2 + (i * 0.073 % 0.3);
    return arr;
  }, []);

  // Vertex buffers (mutated in-place)
  const positions = useMemo(() => new Float32Array(TOTAL * 3), []);
  const colors = useMemo(() => {
    const arr = new Float32Array(TOTAL * 3);
    EDGES.forEach(([a], e) => {
      const c = new THREE.Color(NODES[a].color);
      for (let p = 0; p < PPE; p++) {
        const i = (e * PPE + p) * 3;
        arr[i] = c.r; arr[i+1] = c.g; arr[i+2] = c.b;
      }
    });
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ptsRef.current) return;
    const attr = ptsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const pos = attr.array as Float32Array;

    EDGES.forEach(([aIdx, bIdx], e) => {
      const a = NODES[aIdx].pos, b = NODES[bIdx].pos;
      const spd = speeds[e];
      for (let p = 0; p < PPE; p++) {
        const idx = e * PPE + p;
        tVals[idx] = (tVals[idx] + delta * spd) % 1;
        const t = tVals[idx];
        pos[idx*3]   = a[0] + (b[0] - a[0]) * t;
        pos[idx*3+1] = a[1] + (b[1] - a[1]) * t;
        pos[idx*3+2] = a[2] + (b[2] - a[2]) * t;
      }
    });
    attr.needsUpdate = true;
  });

  return (
    <points ref={ptsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]}    attach="attributes-color"    />
      </bufferGeometry>
      <pointsMaterial
        vertexColors size={0.065} sizeAttenuation
        transparent opacity={0.95}
        blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  );
}

// ─── Distant star dust ────────────────────────────────────────────────
function StarDust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 700;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + (i * 0.0137 % 1) * 8;
      const theta = (i * 2.399) % (Math.PI * 2);
      const phi = Math.acos(1 - 2 * ((i * 0.618) % 1));
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.005;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.003) * 0.04;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent size={0.016} sizeAttenuation
        color="#7B9FFF" opacity={0.38} depthWrite={false}
      />
    </Points>
  );
}

// ─── Main cluster group (rotation + mouse parallax) ───────────────────
function KubeNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.014 + pointer.x * 0.09;
    groupRef.current.rotation.x = Math.sin(t * 0.007) * 0.1 + pointer.y * -0.06;
  });

  return (
    <group ref={groupRef}>
      <GridSphere />
      <ConnectionLines />
      <DataPackets />
      {NODES.map((n, i) => <GlowNode key={i} {...n} />)}
    </group>
  );
}

// ─── Canvas root ──────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <StarDust />
        <KubeNetwork />
      </Canvas>

      {/* Edge vignette — only fades outer rim, leaves centre open */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 95% 95% at 50% 50%, transparent 50%, #0A0A0A 100%)",
        }}
      />
    </div>
  );
}
