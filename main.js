
var height = 300,
  width = 300,
  framesToCount = 50,
  frame = 0;
var background = "black";
var velX,
  velY,
  points = 0;
var cube = {};
var btnReset;
var cars = [{}];
var youLost = false,
  stopped = false;



function loop() {
  if (youLost === false) {
    ctxPoints.fillStyle = "white";
    ctxPoints.clearRect(0, 0, width, pointsCanv.height);
    ctxPoints.fillText("Points: " + points, 10, 70);
  } else if (youLost === true) {
    ctxPoints.fillStyle = "white";
    ctxPoints.clearRect(0, 0, width, pointsCanv.height);
    ctxPoints.fillText("Hai perso!", 10, 70);
    stopped = true;
  }
  if (!stopped) {
    frame++;
    detectCollision();
    if (frame >= 80 && !stopped) {
      spawnCars();
      frame = 0;
    } else {
      if (frame % 2 == 0) {
        updateCarsPosition();
      }
    }
  } else {
    btnReset.style.visibility = "visible";
  }
}

function moveCube(event) {
  if (stopped === false) {
    switch (event.key) {
      case "ArrowRight":
        clearCube();
        if (cube.x < width) {
          cube.x += cube.px;
        }
        updateCubePosition();
        break;
      case "ArrowLeft":
        clearCube();
        if (cube.x > cube.px) {
          cube.x -= cube.px;
        }
        updateCubePosition();
        break;
      case "ArrowUp":
        clearCube();
        if (cube.y > cube.px) {
          cube.y -= cube.px;
        }
        updateCubePosition();
        if (youLost == false) points++;
        break;
      case "ArrowDown":
        clearCube();
        if (cube.y < height) {
          cube.y += cube.px;
        }
        updateCubePosition();
        break;
      default:
    }
  }
}

function spawnCube() {
  cube.px = 10;
  cube.color = "white";
  cube.x = width / 2;
  cube.y = height;
  ctx.fillStyle = cube.color;
  ctx.fillRect(cube.x - cube.px, cube.y - cube.px, cube.px, cube.px);
}

function clearCube() {
  ctx.clearRect(cube.x - cube.px, cube.y - cube.px, cube.px, cube.px);
}

function updateCubePosition() {
  ctx.fillStyle = cube.color;
  ctx.fillRect(cube.x - cube.px, cube.y - cube.px, cube.px, cube.px);
}

function updateCarsPosition() {
  for (var i = 0; i < cars.length; i++) {
    var car = cars[i];
    ctx.clearRect(car.x, car.y, car.length * 10, 10);
    if (car.x < width) {
      car.x += car.xVel;
      ctx.fillStyle = car.color;
      ctx.fillRect(car.x, car.y, car.length * 10, 10);
    } else {
      cars.splice(i, 1);
    }
  }
}

function spawnCars() {
  var car = {
    length: "",
    x: 0,
    y: "",
    xVel: "",
    yPos: "",
    color: "blue"
  };
  var rand = randomIntFromInterval(2, 3);
  car.length = rand;
  car.yPos = randomIntFromInterval(1, 5); // Math.floor(Math.rsaandom() * 5);
  car.y = cube.y - car.yPos * cube.px;
  car.xVel = Math.round(1) + Math.floor(car.yPos / 2);
  if ((car.y / cube.px) % 2 == 0) {
    car.x = width - car.length * 10;
    car.xVel = -Math.abs(car.xVel);
  }
  cars.push(car);
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.length * 10, 10);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function detectCollision() {
  for (var i in cars) {
    var car = cars[i];
    if (
      car.y == cube.y - cube.px &&
      car.x <= cube.x &&
      cube.x <= car.x + car.length * 10
    ) {
      console.log("collision");
      youLost = true;
      return true;
    }
  }
  return false;
}

function drawScene() {
  container.width = width;
  container.style.maxWidth = width;
  pointsCanv.width = width;
  pointsCanv.height = height / 4;
  pointsCanv.style.backgroundColor = background;
  pointsCanv.style.color = "white";
  scene.width = width;
  scene.height = height;
  scene.style.backgroundColor = background;
  btnReset = document.createElement("button");
  btnReset.id = "btn_reset";
  btnReset.innerText = "Restart";
  btnReset.onclick = function () {
    restartGame();
  };
  btnReset.style.display = "block";
  btnReset.style.visibility = "hidden";
  container.appendChild(btnReset);
}

function restartGame() {
  points = 0;
  cars = [{}];
  btnReset.remove();
  stopped = false;
  youLost = false;
  drawScene();
  spawnCube();
  btnReset.style.visibility = "hidden";
}
