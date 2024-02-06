import { useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";


export const useWheels = (radius, wheelWidth, BWLPos, BWRPos, FWLPos, FWRPos) => {

    const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const wheelInfo = {
        radius,
        directionLocal : [0,-1,0],
        axleLocal : [-1,0,0],
        suspensionStiffness : 60,
        suspensionRestLength : 0.1,
        frictionSlip : 50,
        dampingRelaxation : 2,
        dampingCompression : 3,
        maxSuspensionForce : 10000,
        rollInfluence : 0.01,
        maxSuspensionTravel : 0.1,
        customSlidingRotationalSpeed : -30,
        useCustomSlidingRotationalSpeed :true,
    }
    const wheelInfos = [
        {
            ...wheelInfo,
            chassisConnectionPointLocal : BWLPos,
            isFrontWheel : true
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal : BWRPos,
            isFrontWheel : true
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal : FWLPos,
            isFrontWheel : false
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal : FWRPos,
            isFrontWheel : false
        },

    ]

    const propsFunc = () =>({
        collisionFilterGroup : 1,
        mass : 100,
        shapes : [
            {
                args : [wheelInfo.radius, wheelInfo.radius, wheelWidth, 16],
                rotation : [0,0, -Math.PI/2],
                type : 'Cylinder'
            }
        ],
        type : 'Kinematic'

    })

    useCompoundBody(propsFunc, wheels[0])
    useCompoundBody(propsFunc, wheels[1])
    useCompoundBody(propsFunc, wheels[2])
    useCompoundBody(propsFunc, wheels[3])

  return [wheels, wheelInfos]
}
