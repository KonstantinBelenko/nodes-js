import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

function Box(props) {

    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Set up state for the hovered state
    const [hovered, setHover] = useState(false)

    // Animation settings
    let amplitude = props.amplitude ? props.amplitude : 0.003 ;

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(({ clock }) => {
        mesh.current.rotation.z += amplitude * Math.sin(clock.elapsedTime+1.5);
        mesh.current.rotation.y += amplitude * Math.sin(clock.elapsedTime+1.5);
    })
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            position={props.position}
            ref={mesh}
            scale={hovered ? 1.01 : 1}
            onPointerOver={(event) => {setHover(true); props.setHovered(true)}}
            onPointerOut={(event) => {setHover(false); props.setHovered(false)}}
            onClick={props.onClick}>
            <boxGeometry args={props.args} />
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
    )
}

export default Box;