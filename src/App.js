import './App.css';
import Sketch from "react-p5";

const canvasSize = {width: 800, height: 800}
const friction = 0.2;
const bounce = 0.8;

const charge_q = 1
const coulombs_constant = 1 
const attraction_force = -6
const repulsion_force = 5.9

const circles = []

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
};

class circle {
  constructor (x, y, initX, initY, r) {
    this.x = x
    this.y = y

    this.oldx = this.x + initX
    this.oldy = this.y + initY

    this.isDrag = false
    
    this.r = r
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
    if (obj.x + obj.r / 2 > canvasSize.width) {
      obj.x = canvasSize.width - obj.r / 2
      obj.oldx = obj.x + vx * bounce
    }
    else if(obj.x < 0 + obj.r / 2)
    {
      obj.x = 0 + obj.r / 2
      obj.oldx = obj.x + vx * bounce
    }

    if (obj.y + obj.r / 2 > canvasSize.height) {
      obj.y = canvasSize.height - obj.r / 2
      obj.oldy = obj.y + vy * bounce
    }
    else if(obj.y < 0 + obj.r / 2)
    {
      obj.y = 0 + obj.r / 2
      obj.oldy = obj.y + vy * bounce
    }

  })
}

function updatePosition (canvasSize, objects) {
  objects.forEach((obj, index) => {
    if (obj.isDrag) return
    
    // let vx = (canvasSize.width/2 - obj.oldx) * friction
    // let vy = (canvasSize.height/2 - obj.oldy) * friction 

    objects.forEach((jobj, jndex) => {
      if (index === jndex) return
      
      let direction_x = jobj.x - obj.x
      let direction_y = jobj.y - obj.y

      let r = Math.sqrt(direction_x * direction_x + direction_y * direction_y)

      let dx_n = direction_x / r
      let dy_n = direction_y / r

      let fa_x = dx_n * attraction_force / r*r
      let fa_y = dy_n * attraction_force / r*r

      let fr_x = dx_n * -repulsion_force / r*r
      let fr_y = dy_n * -repulsion_force / r*r

      jobj.oldx = jobj.x
      jobj.oldy = jobj.y

      jobj.x += fa_x + fr_x
      jobj.y += fa_y + fr_y
    })

    // obj.oldx = obj.x
    // obj.oldy = obj.y

    // obj.x += vx;
    // obj.y += vy;
  })
}

function drawObjects (objects, p5) {
  p5.background(0);
  objects.forEach(obj => {
    p5.ellipse(obj.x, obj.y, obj.r, obj.r)
  })
}

function createCircle (x, y, r=75) {
  circles.push(new circle(x, y, 0, 0, r))
}

function App() {

  // const [circles, setCircles] = useState(() => {
  //   return [new circle(10, 400, 0, 0, 75, 75)]
  // })

  circles.push(new circle(Math.random() * 1000, Math.random() * 1000, 0, 0, 75))

  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(canvasSize.width, canvasSize.height).parent(canvasParentRef);
	};

	const draw = (p5) => {

    checkCollision(canvasSize, circles)
    updatePosition(canvasSize, circles)
    drawObjects(circles, p5)

  };

  const mousePressed = (e) => {
    createCircle(e.mouseX, e.mouseY)
  }
  

  return (
    <div className="App">
      <div className='w-screen h-screen bg-sky-200 flex items-center justify-center'>
        <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />

      </div>
    </div>
  );
}

export default App;
