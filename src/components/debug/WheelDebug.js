
const debug = true

export const WheelDebug = ({radius, wheelRef, width}) => {
  return debug && (
    <group ref = {wheelRef}>
        <mesh rotation={[0,0,Math.PI/2]}>
            <cylinderGeometry args={[radius, radius, width,16]}/>
            <meshNormalMaterial/>
        </mesh>
    </group>
  )
}
