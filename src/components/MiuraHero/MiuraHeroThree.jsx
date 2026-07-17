// src/components/MiuraHero/MiuraHeroThree.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MiuraScene({ foldProgress = 0 }) {
  const bandsRef = useRef([]);
  const rosetteRef = useRef();
  const cutLineRef = useRef();
  const ctaRef = useRef();

  // Miura fold parameters
  const baseAngles = [12, 24, 36]; // degrees per band
  const depthSteps = [-15, 0, 15]; // Z offset per band

  // Background tessellation texture
  const bgTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/textures/bg-tessellation.png');
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(() => {
    // Animate Bands_Group
    bandsRef.current.forEach((band, i) => {
      if (!band) return;
      const targetAngle = THREE.MathUtils.degToRad(baseAngles[i] * foldProgress);
      const targetZ = depthSteps[i] * foldProgress;
      band.rotation.x = THREE.MathUtils.lerp(band.rotation.x, targetAngle, 0.15);
      band.position.z = THREE.MathUtils.lerp(band.position.z, targetZ, 0.15);
    });

    // Animate Rosette_Group extrusion
    if (rosetteRef.current) {
      rosetteRef.current.scale.z = 1 + foldProgress * 0.6;
    }

    // Animate Rosette_CutLine visibility
    if (cutLineRef.current) {
      cutLineRef.current.material.opacity = THREE.MathUtils.lerp(
        cutLineRef.current.material.opacity,
        foldProgress * 0.9,
        0.1
      );
    }

    // Animate CTA_Button glow + lift
    if (ctaRef.current) {
      ctaRef.current.position.z = THREE.MathUtils.lerp(
        ctaRef.current.position.z,
        foldProgress * 10,
        0.1
      );
      ctaRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        ctaRef.current.material.emissiveIntensity,
        0.2 + foldProgress * 1.6,
        0.1
      );
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 5, 6]} intensity={0.9} />
      <directionalLight position={[-6, 2, -4]} intensity={0.35} />

      {/* BG_Tessellation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -40]}>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.95}
          metalness={0}
          map={bgTexture}
        />
      </mesh>

      {/* Bands_Group */}
      <group>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => (bandsRef.current[i] = el)}
            position={[0, 0, 0]}
          >
            <boxGeometry args={[140, 45, 1.2]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#e8e0d0' : '#dbd2bf'}
              roughness={0.85}
              metalness={0}
            />
          </mesh>
        ))}
      </group>

      {/* Rosette_Group */}
      <group ref={rosetteRef} position={[0, 8, 0]}>
        {/* Rosette_Center */}
        <mesh>
          <cylinderGeometry args={[7, 7, 1.4, 20]} />
          <meshStandardMaterial
            color="#ffd26a"
            emissive="#ffaa10"
            emissiveIntensity={0.6}
            roughness={0.6}
          />
        </mesh>

        {/* Rosette_Petals */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i * Math.PI) / 4]}
            position={[0, 0, 0.6]}
          >
            <coneGeometry args={[3.5, 9, 4]} />
            <meshStandardMaterial
              color="#f7c55e"
              emissive="#ff9933"
              emissiveIntensity={0.35}
              roughness={0.7}
            />
          </mesh>
        ))}

        {/* Rosette_CutLine */}
        <line
          ref={cutLineRef}
          geometry={new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0.8),
            new THREE.Vector3(24, 0, 0.8),
          ])}
          material={
            new THREE.LineBasicMaterial({
              color: '#00e5ff',
              transparent: true,
              opacity: 0,
            })
          }
        />
      </group>

      {/* CTA_Button */}
      <mesh ref={ctaRef} position={[0, -12, 0]}>
        <boxGeometry args={[28, 7, 1.4]} />
        <meshStandardMaterial
          color="#0b0f19"
          emissive="#00e5ff"
          emissiveIntensity={0.2}
          roughness={0.5}
        />
      </mesh>
    </>
  );
}

export default function MiuraHeroThree({ foldProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 55], fov: 50 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <MiuraScene foldProgress={foldProgress} />
    </Canvas>
  );
}
