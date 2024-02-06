import TruckModel from '../model/Truck.glb'
import { useGLTF } from '@react-three/drei'
import { useBox, useCompoundBody, useDistanceConstraint, useHingeConstraint, useLockConstraint, usePointToPointConstraint } from '@react-three/cannon'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Material, MeshStandardMaterial, TorusGeometry, Vector3 } from 'three'

const HangingToy = ({chasis}) => {
    
    const {scene, nodes, materials} = useGLTF(TruckModel)
    const toyMesh = nodes['Hanging_Toy_Geo']
    const carDimesnion = nodes['Body_Dimension']
    const Chain1_Mesh = nodes['Chain01_DM']
    const Chain2_Mesh = nodes['Chain02_DM']
    const Chain3_Mesh = nodes['Chain03_DM']
    const Chain4_Mesh = nodes['Chain04_DM']
    const Chain5_Mesh = nodes['Chain05_DM']
    const Chain6_Mesh = nodes['Chain06_D']
    const steelMaterial = materials['Buddy_Anime_Plastic_MI']
    const torusMesh = new TorusGeometry(0.013, 0.002, 8, 24)
    console.log(materials['Buddy_Anime_Plastic_MI']);

    const chainArgs = [Chain1_Mesh.scale.x, Chain1_Mesh.scale.y, Chain1_Mesh.scale.z]
    const toyArgs = [Chain6_Mesh.scale.x, Chain6_Mesh.scale.y, Chain6_Mesh.scale.z]


    const chain_01_Pos = [
        Chain1_Mesh.position.x - carDimesnion.position.x, 
        Chain1_Mesh.position.y - carDimesnion.position.y, 
        Chain1_Mesh.position.y - carDimesnion.position.z]

    const chain_02_Pos = [
        Chain2_Mesh.position.x - carDimesnion.position.x, 
        Chain2_Mesh.position.y - carDimesnion.position.y, 
        Chain2_Mesh.position.z - carDimesnion.position.z]

    const chain_03_Pos = [
        Chain3_Mesh.position.x - carDimesnion.position.x, 
        Chain3_Mesh.position.y - carDimesnion.position.y, 
        Chain3_Mesh.position.z - carDimesnion.position.z]

    const chainInfo = {
        collisionFilterGroup : 2,
        collisionFilterMask : 2,
        allowSleep: false,
        args : chainArgs,
        position :[0,0,0],
        linearDamping : 0.01,
        angularDamping :0.01,
    }

    const chainConstraintsInfo = {
        pivotA : [0,-Chain1_Mesh.scale.y/2,0],
        axisA: [0, 0, 1],
        pivotB : [0,Chain1_Mesh.scale.y/2, 0],
        axisB: [0.1, 0, 1],
    }
    
    const [chain1] = useBox(()=>({...chainInfo, mass : 1,}))
    const [chain2] = useBox(()=>({...chainInfo, mass : 0.8,}))
    const [chain3] = useBox(()=>({...chainInfo, mass : 0.6,}))
    const [chain4] = useBox(()=>({...chainInfo, mass : 0.4,}))
    const [chain5] = useBox(()=>({...chainInfo, mass : 0.2,}))
    const [chain6] = useBox(
        ()=>({
            collisionFilterGroup : 2,
            collisionFilterMask : 2,
            allowSleep: false,
            args : toyArgs,
            mass :  0.1,
            position : [0,0,0],
            linearDamping : 0.01,
            angularDamping : 0.1,
        }))
    
    // usePointToPointConstraint(chasis, chain1,{
    //     pivotA : [0,Chain1_Mesh.position.y - carDimesnion.position.y,Chain1_Mesh.position.z - carDimesnion.position.z],
    //     pivotB : [0,+Chain2_Mesh.scale.y/2,0],
    // })

    useHingeConstraint(chasis, chain1,{
        pivotA : [0,Chain1_Mesh.position.y - carDimesnion.position.y + 0.02,Chain1_Mesh.position.z - carDimesnion.position.z],
        axisA : [1,0,1],
        pivotB : [0,Chain2_Mesh.scale.y/2,0],
        axisB : [1,0,1]
    })

    useHingeConstraint(chain1, chain2, {...chainConstraintsInfo});
    useHingeConstraint(chain2, chain3, {...chainConstraintsInfo});
    useHingeConstraint(chain3, chain4, {...chainConstraintsInfo});
    useHingeConstraint(chain4, chain5, {...chainConstraintsInfo});
    useHingeConstraint(chain5, chain6, {
        pivotA : [0,-Chain1_Mesh.scale.y/2, 0],
        axisA: [1, 0, 1],
        pivotB : [0,Chain6_Mesh.scale.y/2 + 0.005, 0],
        axisB: [1, 0, 1],
    });


    return (
        <> <group>
            <group ref={chain1} >
                <mesh material={steelMaterial} geometry={torusMesh} rotation={[0,1,0]} />
            </group>
            <group ref={chain2} >
                <mesh material={steelMaterial} geometry={torusMesh} />
            </group>
            <group ref={chain3} >
                <mesh material={steelMaterial} geometry={torusMesh} rotation={[0,-1,0]} />
            </group> 
            <group ref={chain4} >
                <mesh material={steelMaterial} geometry={torusMesh}/>
            </group> 
            <group ref={chain5} >
                <mesh material={steelMaterial} geometry={torusMesh} rotation={[0,0.7,0]} />
            </group>
            <group ref={chain6} >
                <primitive object={toyMesh} castShadow />
            </group>  
            </group>   
        </>
    )
}

export default HangingToy