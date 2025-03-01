import { Grid } from "@react-three/drei"

export function GroundGrid() {
    const gridConfig = {
      cellSize: 0.5,
      cellThickness: 0.5,
      cellColor: '#6f6f6f',
      sectionSize: 3,
      sectionThickness: 1,
      sectionColor: '#9d4b4b',
      fadeDistance: 50,
      fadeStrength: 1,
      followCamera: false,
      infiniteGrid: true
    }
    return <Grid position={[0, 0, 0]} args={[10.5, 10.5]} {...gridConfig} />
  }