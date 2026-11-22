import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBoxStore } from '../../store/boxStore';

export default function GiftBox() {
  const groupRef = useRef<THREE.Group>(null);
  const isDraggingOver = useBoxStore((s) => s.isDraggingOver);

  // Subtle bounce when dragging over
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = isDraggingOver ? 1.04 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 4
    );
  });

  const boxWidth = 2.4;
  const boxDepth = 2.4;
  const boxHeight = 1.4;
  const wallThickness = 0.06;

  // Materials
  const outerMaterial = new THREE.MeshStandardMaterial({
    color: '#F34D83',
    roughness: 0.3,
    metalness: 0.1,
  });

  const innerMaterial = new THREE.MeshStandardMaterial({
    color: '#F8EDEB',
    roughness: 0.6,
    metalness: 0,
  });

  const ribbonMaterial = new THREE.MeshStandardMaterial({
    color: '#D92968',
    roughness: 0.2,
    metalness: 0.3,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Bottom */}
      <mesh position={[0, wallThickness / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[boxWidth, wallThickness, boxDepth]} />
        <meshStandardMaterial {...outerMaterial} color="#F34D83" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Inner bottom surface */}
      <mesh position={[0, wallThickness + 0.001, 0]}>
        <boxGeometry args={[boxWidth - wallThickness * 2, 0.01, boxDepth - wallThickness * 2]} />
        <meshStandardMaterial {...innerMaterial} color="#F8EDEB" roughness={0.6} metalness={0} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, boxHeight / 2 + wallThickness, boxDepth / 2 - wallThickness / 2]} castShadow>
        <boxGeometry args={[boxWidth, boxHeight, wallThickness]} />
        <meshStandardMaterial {...outerMaterial} color="#F34D83" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, boxHeight / 2 + wallThickness, -boxDepth / 2 + wallThickness / 2]} castShadow>
        <boxGeometry args={[boxWidth, boxHeight, wallThickness]} />
        <meshStandardMaterial {...outerMaterial} color="#F34D83" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-boxWidth / 2 + wallThickness / 2, boxHeight / 2 + wallThickness, 0]} castShadow>
        <boxGeometry args={[wallThickness, boxHeight, boxDepth]} />
        <meshStandardMaterial {...outerMaterial} color="#F34D83" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Right wall */}
      <mesh position={[boxWidth / 2 - wallThickness / 2, boxHeight / 2 + wallThickness, 0]} castShadow>
        <boxGeometry args={[wallThickness, boxHeight, boxDepth]} />
        <meshStandardMaterial {...outerMaterial} color="#F34D83" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Inner wall panels (cream colored) */}
      {/* Front inner */}
      <mesh position={[0, boxHeight / 2 + wallThickness, boxDepth / 2 - wallThickness - 0.001]}>
        <boxGeometry args={[boxWidth - wallThickness * 2, boxHeight - 0.02, 0.01]} />
        <meshStandardMaterial {...innerMaterial} color="#F8EDEB" roughness={0.6} metalness={0} />
      </mesh>
      {/* Back inner */}
      <mesh position={[0, boxHeight / 2 + wallThickness, -boxDepth / 2 + wallThickness + 0.001]}>
        <boxGeometry args={[boxWidth - wallThickness * 2, boxHeight - 0.02, 0.01]} />
        <meshStandardMaterial {...innerMaterial} color="#F8EDEB" roughness={0.6} metalness={0} />
      </mesh>
      {/* Left inner */}
      <mesh position={[-boxWidth / 2 + wallThickness + 0.001, boxHeight / 2 + wallThickness, 0]}>
        <boxGeometry args={[0.01, boxHeight - 0.02, boxDepth - wallThickness * 2]} />
        <meshStandardMaterial {...innerMaterial} color="#F8EDEB" roughness={0.6} metalness={0} />
      </mesh>
      {/* Right inner */}
      <mesh position={[boxWidth / 2 - wallThickness - 0.001, boxHeight / 2 + wallThickness, 0]}>
        <boxGeometry args={[0.01, boxHeight - 0.02, boxDepth - wallThickness * 2]} />
        <meshStandardMaterial {...innerMaterial} color="#F8EDEB" roughness={0.6} metalness={0} />
      </mesh>

      {/* Ribbon - vertical */}
      <mesh position={[0, boxHeight / 2 + wallThickness, boxDepth / 2 - wallThickness / 2 + 0.001]} castShadow>
        <boxGeometry args={[0.15, boxHeight + 0.01, wallThickness + 0.01]} />
        <meshStandardMaterial {...ribbonMaterial} color="#D92968" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Ribbon - horizontal on front */}
      <mesh position={[0, boxHeight * 0.6 + wallThickness, boxDepth / 2 - wallThickness / 2 + 0.001]}>
        <boxGeometry args={[boxWidth + 0.01, 0.15, wallThickness + 0.01]} />
        <meshStandardMaterial {...ribbonMaterial} color="#D92968" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Glow effect when dragging */}
      {isDraggingOver && (
        <mesh position={[0, boxHeight / 2 + wallThickness, 0]}>
          <boxGeometry args={[boxWidth + 0.3, boxHeight + 0.3, boxDepth + 0.3]} />
          <meshBasicMaterial color="#F34D83" transparent opacity={0.08} />
        </mesh>
      )}
    </group>
  );
}
