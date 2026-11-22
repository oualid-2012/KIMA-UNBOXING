import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useBoxStore } from '../../store/boxStore';

function ProductInBox({
  position,
  label,
  color,
  index,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Gentle floating
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime() * 1.5 + index * 0.7) * 0.03;
    meshRef.current.rotation.y =
      Math.sin(clock.getElapsedTime() * 0.5 + index * 1.2) * 0.1;
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} castShadow>
        <boxGeometry args={[0.45, 0.35, 0.35]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      <Billboard position={[position[0], position[1] + 0.35, position[2]]}>
        <Text
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="bottom"
          maxWidth={1}
        >
          {label.length > 12 ? label.slice(0, 12) + '…' : label}
        </Text>
      </Billboard>
    </group>
  );
}

const productColors = [
  '#F8EDEB',
  '#eed5cf',
  '#e8c4bc',
  '#f0d8d4',
  '#f5e6e2',
  '#dfc5bf',
  '#f2ddd8',
  '#e6cfc9',
];

export default function BoxProducts() {
  const items = useBoxStore((s) => s.items);

  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const cols = 3;
    items.forEach((item, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - (cols - 1) / 2) * 0.55;
      const y = 0.3 + row * 0.4;
      const z = (Math.random() - 0.5) * 0.4;
      pos.push([x, y, z]);
    });
    return pos;
  }, [items.length]);

  return (
    <group>
      {items.map((item, i) => (
        <ProductInBox
          key={item.product.id}
          position={positions[i] || [0, 0.3 + i * 0.4, 0]}
          label={item.product.name}
          color={productColors[i % productColors.length]}
          index={i}
        />
      ))}
    </group>
  );
}
