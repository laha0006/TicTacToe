let cnv;
let w;
let h;

function setup() {
  cnv = createCanvas(600,600)
  w = 600/3
  h = 600/3
  centerCanvas();
  cnv.mouseClicked(canvasClicked)
}
function centerCanvas() {
  let x = (windowWidth - width) / 2; // Center horizontally
  cnv.position(x, 50); // 50 is the y-position; adjust as needed
}

function draw() {
  background('#121212');
  drawBoard()
}

function drawBoard(state) {
  stroke('white')
  strokeWeight(2)
  line(0,0,0,600)
  line(200,0,200,600)
  line(400,0,400,600)
  line(600,0,600,600)

  line(0,0,600,0)
  line(0,200,600,200)
  line(0,400,600,400)
  line(0,600,600,600)
  fill('#121212')
  // circle(100,100,140,140)
  // circle(300,100,120,120)
  // circle(500,100,120,120)
  strokeWeight(3)
  line(50,50,150,150)
  line(50,150,150,50)

  line(250,50,350,150)
  line(250,150,350,50)

  line(450,50,550,150)
  line(450,150,550,50)

  line(50,250,150,350)
  line(50,350,150,250)

  line(250,250,350,350)
  line(250,350,350,250)

  line(450,250,550,350)
  line(450,350,550,250)

  line(50,450,150,550)
  line(50,550,150,450)

  line(250,450,350,550)
  line(250,550,350,450)

  line(450,450,550,550)
  line(450,550,550,450)


}

function canvasClicked() {
  // console.log("Canvas clicked at:", mouseX, mouseY);
  if(mouseX <= 200 && mouseY <= 200){
    console.log("TOP LEFT?")
  }
  else if(mouseX <= 400 && mouseY <= 200){
    console.log("TOP CENTER?")
  }
  else if (mouseX <= 600 && mouseY <= 200){
    console.log("TOP RIGHT?")
  }
  else if (mouseX <= 200 && mouseY <= 400) {
    console.log("MID LEFT")
  }
  else if (mouseX <= 400 && mouseY <= 400) {
    console.log("MID CENTER ")
  }
  else if (mouseX <= 600 && mouseY <= 400) {
    console.log("MID RIGHT ")
  }
  else if (mouseX <= 200 && mouseY <= 600) {
    console.log("BOT LEFT")
  }
  else if (mouseX <= 400 && mouseY <= 600) {
    console.log("BOT CENTER")
  }
  else if (mouseX <= 600 && mouseY <= 600) {
    console.log("BOT RIGHT")
  }
}
// console.log(evaluate([1,-1,0,-1,-1,-1,-1,-1,-1]))
// console.log(checkWinState([1,1,1,-1,-1,-1,-1,-1,-1]))
// console.log(checkWinState([0,0,0,-1,-1,-1,-1,-1,-1]))
// console.log(checkWinState([1,0,0,1,-1,-1,1,-1,-1]))
// console.log(checkWinState([1,0,0,-1,1,-1,-1,-1,1]))