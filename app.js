const canvas = document.querySelector("#jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.querySelectorAll(".controls_color")
const range = document.querySelector("#jsRange")
const mode = document.querySelector("#jsMode")
const save = document.querySelector("#jsSave")

const STARTING_COLOR = '#2c2c2c'

ctx.fillStyle = "white"
ctx.fillRect(0,0,700,700) // 초기 배경값 흰색으로 지정하기

ctx.strokeStyle = STARTING_COLOR
ctx.fillStyle = STARTING_COLOR
ctx.lineWidth = '2.5'

// canvas.width = canvas.offsetWidth;
// canvas.height = canvas.offsetHeight;

let isPainting = false
let isMode = false

function doPainting(){
  isPainting = true
}

function notPainting(){
  isPainting = false
}

function mouseMove(e){
  const x = e.offsetX
  const y = e.offsetY
  if(!isPainting){
    ctx.beginPath()
    ctx.moveTo(x,y)
  }else{
    if(!isMode){
      ctx.lineTo(x,y)
      ctx.stroke()
    }
  }
}

function onMouseEnter(e){
  const x = e.offsetX;
  const y = e.offsetY;
  ctx.moveTo(x, y);
}

function changeColor(){
  ctx.strokeStyle = this.style.backgroundColor
  ctx.fillStyle = this.style.backgroundColor
}

function changeRange(e){
  ctx.lineWidth = e.target.value
}

function changeMode(){
  if(!isMode){
    isMode = true
    mode.innerText = 'fill'
  }else{
    isMode = false
    mode.innerText = 'draw'
  }
}

function filling(){
  if(isMode){
    ctx.fillRect(0,0,700,700)
  }
}

function saving(){
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = "PaintJS🖌"
  link.click()
}

canvas.addEventListener("mousemove",mouseMove)
canvas.addEventListener("mousedown",doPainting)
document.addEventListener("mouseup", notPainting);
canvas.addEventListener("mouseenter", onMouseEnter);
canvas.addEventListener("mousedown", filling)

colors.forEach( color => color.addEventListener("click",changeColor))
range.addEventListener("input",changeRange)
mode.addEventListener("click",changeMode)
document.addEventListener("contextmenu", e => e.preventDefault())
save.addEventListener("click",saving)

