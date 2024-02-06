import React from 'react'
import { Scene } from './components/Scene'
import { Debug, Physics } from '@react-three/cannon'

export const App = () => {
  console.log(Physics);
  return (
    <Physics broadphase='SAP' gravity={[0,-8,0]} tolerance = {0.01} >
      {/* <Debug> */}
        <Scene/>
        {/* </Debug> */}
    </Physics>
  )
}
