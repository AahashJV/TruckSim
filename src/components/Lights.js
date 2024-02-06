import React from 'react'
import { Environment} from "@react-three/drei"
import { Shadow } from '@react-three/drei'
const Lights = ({reference}) => {
  return (
    <>
    <Environment preset={"city"} resolution={64} intensity={0.1} />   
  </>
  )
}

export default Lights