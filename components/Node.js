import { Html } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import Box from './Box';

const MovingText = (props) => {

    const mesh = useRef()
    
    useFrame(({ clock }) => {
        mesh.current.position.x += -(props.amplitude * 1.5 * Math.sin(clock.elapsedTime+1.5));
    });

    return (
        <mesh
            position={props.position}
            ref={mesh}
            transform>             
            <Html 
                distanceFactor={1} 
                as='div'>
                {props.children}
            </Html>
        </mesh>
    )
}

const Node = (props) => {

    const node_text = <div class="text-sky-400">Web Works</div>
    
    let text_position = props.position.slice(); text_position[1] += 1; text_position[0] -= 0.35;

    return (<>
        <MovingText position={text_position} amplitude={props.amplitude}>
            <div className="label" style={{fontSize: "3em", textAlign: "center", display: "inline-block", overflow: "hidden", whiteSpace: "nowrap"}}>
                <h1>{node_text}</h1>
            </div>
        </MovingText>

        <Box 
          position={props.position} 
          onClick={props.onClick}
          args={props.args} 
          amplitude={props.amplitude} 
          setHovered={props.setHovered}
        />
    </> )
}

export default Node;