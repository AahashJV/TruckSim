import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";
import { useWheels } from "./hooks/useWheels";
import { WheelDebug } from "./debug/WheelDebug";
import { useKeyboardControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import TruckModel from '../model/Truck.glb'
import HangingToy from "./HangingToy";
// import {useControls} from './hooks/useControls.js'


export const Car = ({thirdPerson}) => {

  //Importing Truck model
  const {scene, nodes} = useGLTF(TruckModel)
  const carBody = nodes['Truck_Body_Geo']
  const carFLWheel = nodes['Front_L_Wheel_Geo']
  const carFRWheel = nodes['Front_R_Wheel_Geo']
  const carBLWheel = nodes['Back_L_Wheel_Geo']
  const carBRWheel = nodes['Back_R_Wheel_Geo']
  
  //Enabling shadows for particular mesh
  const shadowMesh = [
    'Truck_Body_Geo',
    'Front_L_Wheel_Geo',
    'Front_R_Wheel_Geo',
    'Back_L_Wheel_Geo',
    'Back_R_Wheel_Geo']

  useLayoutEffect(() => {
    shadowMesh.forEach(name => {
      if (nodes[name]) {
        nodes[name].traverse(e => {
          if (e.isMesh) {
            e.castShadow = true;
            e.receiveShadow = true;
          }
        });
      }
    });
  }, []);


  //Importing Dimensions
  const carDimesnion = nodes['Body_Dimension']
  const BWLDimension = nodes['BWL_D']
  const BWRDimension = nodes['BWR_D']
  const FWLDimension = nodes['FWL_D']
  const FWRDimension = nodes['FWR_D']


  //Chassis Dimensions
    const position = [carDimesnion.position.x, carDimesnion.position.y, carDimesnion.position.z]
    const width = carDimesnion.scale.x
    const height = carDimesnion.scale.y
    const front = carDimesnion.scale.z
    

  //Wheels Dimensions
    const wheelRadius = BWLDimension.scale.y/2
    const wheelWidth = BWLDimension.scale.x
    const BWLPos = [BWLDimension.position.x - position[0], BWLDimension.position.y - position[1], BWLDimension.position.z - position[2],]
    const BWRPos = [BWRDimension.position.x - position[0], BWRDimension.position.y - position[1], BWRDimension.position.z - position[2],]
    const FWLPos = [FWLDimension.position.x - position[0], FWLDimension.position.y - position[1], FWLDimension.position.z - position[2],]
    const FWRPos = [FWRDimension.position.x - position[0], FWRDimension.position.y - position[1], FWRDimension.position.z - position[2],]


  //Creating Chassis
    const chassisBodyArgs = [width, height, front]
    const [chassisBody, chassisApi] = useBox(
        ()=>({
            allowSleep: false,
            args : chassisBodyArgs,
            mass : 150,
            position,
            collisionFilterGroup : 0,
            collisionFilterMask : 0,
        }),
        useRef(null)
    )

  //Crteating Wheels
    const [wheels, wheelInfos] = useWheels(wheelRadius, wheelWidth, BWLPos, BWRPos, FWLPos, FWRPos)
    const [vehicle, vehicleApi] = useRaycastVehicle(()=>({
      chassisBody,
      wheelInfos,
      wheels
    }),
    useRef(null))


    const [smoothedCameraPos] = useState(()=> new Vector3())
    const [smoothedCameraTar] = useState(()=> new Vector3())
    const lightref = useRef()


  //getting keyboard Inputs
    const [subKeys, getKeys] = useKeyboardControls()
    useFrame((state, delta)=>{
      const {forward,backward,leftward,rightward,jump,reset} = getKeys()
      

      if(forward){
        vehicleApi.applyEngineForce(30000*delta,0)
        vehicleApi.applyEngineForce(30000*delta,1)
      }else if(backward){
        vehicleApi.applyEngineForce(-30000 * delta,0)
        vehicleApi.applyEngineForce(-30000* delta,1)
      }else {
        vehicleApi.applyEngineForce(0,0)
        vehicleApi.applyEngineForce(0,1)
      }

      if(leftward){
        vehicleApi.setSteeringValue(0.5,2)
        vehicleApi.setSteeringValue(0.5,3)
      }else if(rightward){
        vehicleApi.setSteeringValue(-0.5,2)
        vehicleApi.setSteeringValue(-0.5,3)
      }else{
        for(let i = 0; i<4; i++){
          vehicleApi.setSteeringValue(0,i)
        }
      }

      if (backward) {chassisApi.applyLocalImpulse([0,-3,0],[0,0,1]) }
      if (forward) {chassisApi.applyLocalImpulse([0,-3,0],[0,0,-1]) }
      if (leftward) {chassisApi.applyLocalImpulse([0,-3,0],[-0.5,0,]) }
      if (rightward) {chassisApi.applyLocalImpulse([0,-3,0],[0.5,0,0]) }
      if (jump) {chassisApi.applyLocalImpulse([0,30,0],[0,0,0.01 ])}

      if(reset){
        chassisApi.position.set(position[0], position[1],position[2])
        chassisApi.velocity.set(0,0,0)
        chassisApi.angularVelocity.set(0,0,0)
        chassisApi.rotation.set(0,0,0)
      }
      
      let vehiclePosition = new Vector3(0,0,0)
      vehiclePosition.setFromMatrixPosition(chassisBody.current.matrixWorld)
      console.log(vehiclePosition);
      lightref.current.position.x = vehiclePosition.x + 1
      lightref.current.position.z = vehiclePosition.z + 1


      lightref.current.target.position.x = vehiclePosition.x
      lightref.current.target.position.z = vehiclePosition.z

      lightref.current.target.updateMatrixWorld()

      // if(!thirdPerson){

      
      // const cameraPosition = new Vector3()
      // cameraPosition.copy(vehiclePosition)
      // cameraPosition.z += 4
      // cameraPosition.y += 1.5

      // const cameraTarget = new Vector3()
      // cameraTarget.copy(vehiclePosition)
      // cameraTarget.y +=0

      // smoothedCameraPos.lerp(cameraPosition,10 * delta)
      // smoothedCameraTar.lerp(cameraTarget,10 * delta)


      // state.camera.position.copy(smoothedCameraPos)
      // state.camera.lookAt(smoothedCameraTar)
      // }


    },[vehicleApi, chassisApi])

  return (
    <>
    <HangingToy chasis = {chassisBody} />
    {/* Vehicle Component */}
    <group ref={vehicle} name="vehicle">

      {/* Chassis */}
      <group ref={chassisBody} name="chassisbody">     
        <primitive object={carBody}/>
      </group>

      {/* Wheels */}
      <group ref={wheels[0]}>
        <primitive object={carBLWheel} castShadow />
      </group>
      <group ref={wheels[1]}>
        <primitive object={carBRWheel}/>
      </group>
      <group ref={wheels[2]}>
          <primitive object={carFLWheel} />
      </group>
      <group ref={wheels[3]}>
          <primitive object={carFRWheel} />
      </group>

      {/* <mesh ref={chassisBody}>
          <boxGeometry args={chassisBodyArgs}/>
          <meshStandardMaterial opacity={0.5} transparent/>
      </mesh>
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} width={wheelWidth}/>
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} width={wheelWidth}/>
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} width={wheelWidth}/>
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} width={wheelWidth}/> */}

    </group>
    <directionalLight
        ref={lightref}
        intensity={2}
        position={[1, 1, 1]}
        color="white"
        castShadow
        shadow-bias = {0.01}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
    </>
    
  )
}
