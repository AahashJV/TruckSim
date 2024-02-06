import { Environment, PerspectiveCamera, OrbitControls} from "@react-three/drei"
import { Suspense, useState } from "react"
import { Ground } from "./Ground"
import { Car } from "./Car"
import Lights from "./Lights"



export const Scene = () => {
  const [thirdPerson, setThirdPerson] = useState(true)
  const [cameraPosition, setCameraPosition] = useState([0,3,6.2])

  return (
    <>
    <Suspense fallback={"loading"}>
      <PerspectiveCamera makeDefault  position={cameraPosition} fov={40} />
      <OrbitControls position={[0,0,0]} />
        <Ground/>
        <Car thirdPerson = {thirdPerson}/>
        <Lights/>
    </Suspense>
    </>
  )
}
