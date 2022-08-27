import './App.css';
import Sketch from "react-p5";
import { on } from 'events';
import { useState } from 'react';

const canvasSize = {width: 800, height: 800}
const friction = 0.99;
const bounce = 0.8;

var circles = []

class circle {
  constructor (x, y, initX, initY, width, height) {
    this.x = x
    this.y = y

    this.oldx = this.x + initX
    this.oldy = this.y + initY

    this.isDrag = false
    
    this.width = width
    this.height = height
  }

  setPos(x, y) {
    this.x = x
    this.y = -y
    this.oldx = x;
    this.oldy = -y;
  }

  // Add force to the circle
  addForce(vx, vy) {
    this.oldx += -vx
    this.oldy += vy
  }
}


function checkCollision (canvasSize, objects) {
  objects.forEach(obj => {
    
    // Calculate future possible velocity
    let vx = (obj.x - obj.oldx) * friction;
    let vy = (obj.y - obj.oldy) * friction;

    // Check if future velocity will drive object out of bounds and stop it accordingly
    if (obj.x + obj.width / 2 > canvasSize.width) {
      obj.x = canvasSize.width - obj.width / 2
      obj.oldx = obj.x + vx * bounce
    }
    else if(obj.x < 0 + obj.width / 2)
    {
      obj.x = 0 + obj.width / 2
      obj.oldx = obj.x + vx * bounce
    }

    if (obj.y + obj.height / 2 > canvasSize.height) {
      obj.y = canvasSize.height - obj.height / 2
      obj.oldy = obj.y + vy * bounce
    }
    else if(obj.y < 0 + obj.height / 2)
    {
      obj.y = 0 + obj.height / 2
      obj.oldy = obj.y + vy * bounce
    }

  })
}

function updatePosition (canvasSize, objects) {
  objects.forEach(obj => {
    if (obj.isDrag) return
    
    let vx = (obj.x - obj.oldx) * friction
    let vy = (obj.y - obj.oldy) * friction

    obj.oldx = obj.x
    obj.oldy = obj.y

    obj.x += vx;
    obj.y += vy;
  })
}

function drawObjects (objects, p5) {
  p5.background(0);
  objects.forEach(obj => {
    p5.ellipse(obj.x, obj.y, 0, 0, obj.width, obj.height)
  })
}

function App() {

  // const [circles, setCircles] = useState(() => {
  //   return [new circle(10, 400, 0, 0, 75, 75)]
  // })

  circles.push(new circle(10, 400, 0, 0, 75, 75))
  const one = new circle(400, 400, 0, 0, 75, 75)

  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(canvasSize.width, canvasSize.height).parent(canvasParentRef);
	};

	const draw = (p5) => {

    checkCollision(canvasSize, [one])
    updatePosition(canvasSize, [one])

    p5.background(0);
    p5.ellipse(one.x, one.y, 0, 0, one.width, one.height)

  };

  return (
    <div className="App">
      <div className='w-screen h-screen bg-sky-200 flex items-center justify-center'>
        <Sketch setup={setup} draw={draw} />

      </div>
    </div>
  );
}

export default App;
