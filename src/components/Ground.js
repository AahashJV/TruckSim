import { usePlane } from '@react-three/cannon'
import { GroundGrid } from './Grid'
import React from 'react'
import { useRef } from 'react'
import { TextureLoader } from 'three'
export const Ground = () => {

  const textureLoader = new TextureLoader();
  const checkerTex = textureLoader.load('./CheckerTex.png')

  const [ref] = usePlane(
      ()=>({
          type : 'Static',
          rotation : [-Math.PI/2,0,0],
          position : [0,0,0],
      }),
      useRef(null)
  )
  return (
    <>
    
    <mesh rotation-x={-Math.PI*0.5} scale={500} position={[0,-0.01,0]} receiveShadow castShadow>
        <planeGeometry />
        <meshStandardMaterial color={'#0b876d'} roughness={1} />
    </mesh>
    <GroundGrid/>
    </>
  )
}
