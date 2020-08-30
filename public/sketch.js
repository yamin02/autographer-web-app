const theme1 = document.querySelector('.theme1');
const theme2 = document.querySelector('.theme2');
const theme3 = document.querySelector('.theme3');
const theme4 = document.querySelector('.theme4');
const theme5 = document.querySelector('.theme5');
const theme6 = document.querySelector('.theme6');
const theme7 = document.querySelector('.theme7');
const eraser = document.querySelector('#erase');

const reset = document.querySelector('#reset');
const canvas = document.getElementById('draw');
const container = document.getElementsByClassName('container');
const submit = document.getElementById('submit');
const input = document.getElementById('nickname');

let currentcolor = 'black';
const ctx = canvas.getContext('2d');
canvas.height = 900;
canvas.width = 800;
ctx.fillStyle = currentcolor ;
ctx.fillRect(0,0,canvas.width,canvas.height);
// ctx.strokeStyle = 'orange';
// ctx.lineJoin = 'bevel';  
// ctx.lineCap = 'none' ;  


let isDrawing ;
let lastX ;
let lastY ;
let hue ;
let starthue ;
let hueOn ;
let finalhue ;
let colorstroke ;
let touchON ;
let mouseON ;
let eraserON = false;

function draw(e){
input.blur();
if(!isDrawing) return;
if(eraserON){
  ctx.fillStyle = currentcolor;
  ctx.fillRect(lastX,lastY,40,40);
  if(mouseON){
  [ lastX , lastY ] = [e.offsetX , e.offsetY];}
  if(touchON){
    [ lastX , lastY ] = [getOffsetPosition(e,canvas).x ,getOffsetPosition(e,canvas).y];
  }
}else{
  if(hueOn){
    ctx.strokeStyle = `hsl(${hue}, 100% , 50%)` ;
    hue++ ;
  if(hue > finalhue){
    hue = starthue;
  }}else{
    ctx.strokeStyle = hue;
  }
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    if(mouseON){
      ctx.lineTo(e.offsetX , e.offsetY);
      ctx.stroke();
      [ lastX , lastY ] = [e.offsetX , e.offsetY];
    }
    if(touchON){
    e.preventDefault();
    ctx.lineTo(getOffsetPosition(e,canvas).x ,getOffsetPosition(e,canvas).y);
    ctx.stroke();
    [ lastX , lastY ] = [getOffsetPosition(e,canvas).x ,getOffsetPosition(e,canvas).y];
  }
}
}
  //trigger for mouse 
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mousedown',
(e)=> {
  mouseON  = true;
  isDrawing = true;
  [ lastX , lastY ] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () =>  {
isDrawing = false;
//mouseON = false
});
canvas.addEventListener("mouseout",() => {
  isDrawing = false ;
//mouseON = false
});

//triger for touch
canvas.addEventListener('touchmove',draw);
canvas.addEventListener('touchstart',
(e)=> {
  touchON = true;
  isDrawing = true;
  e.preventDefault();
  [ lastX , lastY ] = [getOffsetPosition(e,canvas).x ,getOffsetPosition(e,canvas).y];
});
canvas.addEventListener('touchend', (e) => {
isDrawing = false;
touchON =false; 
e.preventDefault();}) ;
canvas.addEventListener("touchcancel",(e) => {isDrawing = false;
touchON =false;
e.preventDefault();});

//Get the offset for touch
//since offsetX not support by touch
function getOffsetPosition(evt, parent){
  var position = {
      x: (evt.targetTouches) ? evt.targetTouches[0].pageX : evt.clientX,
      y: (evt.targetTouches) ? evt.targetTouches[0].pageY : evt.clientY
  };

  while(parent.offsetParent){
      position.x -= parent.offsetLeft - parent.scrollLeft;
      position.y -= parent.offsetTop - parent.scrollTop;
      parent = parent.offsetParent;
  }
  return position;
}

//reset button
reset.addEventListener("click",()=>{
  ctx.fillStyle = currentcolor;
ctx.fillRect(0,0,canvas.width,canvas.height);
});

window.addEventListener('load',theme03);

theme1.addEventListener('click',theme01);
theme2.addEventListener('click',theme02);
theme3.addEventListener('click',theme03);
theme4.addEventListener('click', theme04);
theme5.addEventListener('click', theme05);
theme6.addEventListener('click', theme06);
theme7.addEventListener('click', theme07);

eraser.addEventListener('click', eraserwork);

let temp;
function eraserwork(){
  if(!eraserON){
    eraserON =true;
    eraser.style.background = 'red';
  }else{eraserON = false;
    eraser.style.background = 'yellow';}
  
}


//all the themes
function theme01(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = false;
  starthue = 200; 
  finalhue = 300;
  currentcolor = '#285943' ;
  ctx.fillStyle = '#285943' ;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  hue = 'orange';
  ctx.lineJoin = 'round';  
  ctx.lineCap = 'round'; 
  ctx.lineWidth = 16 ;  
}

function theme02(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = false;
  starthue = 200; 
  finalhue = 300;
  currentcolor = '#353866';
  ctx.fillStyle = '#353866';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  hue = 'white' ;
  ctx.lineJoin = 'miter';  
  ctx.lineCap = 'round';  
  ctx.lineWidth = 16 ; 
}

function theme03(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = true;
  starthue = 10; 
  finalhue = 300;
  currentcolor = 'black';
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  hue = starthue ;
  ctx.lineJoin = 'bevel';  
  ctx.lineCap = 'butt'; 
  ctx.lineWidth = 16 ;  
}

function theme04(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = false ;
  starthue = 290; 
  finalhue = 330;
  currentcolor = '#f349eb';
  ctx.fillStyle = '#f349eb';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  hue = 'black' ;
  ctx.lineJoin = 'miter';  
  ctx.lineCap = 'butt';  
  ctx.lineWidth = 16 ; 
}

function theme05(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = true;
  starthue = 150; 
  finalhue = 190;
  currentcolor = 'white';
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  hue = starthue ;
  ctx.lineJoin = 'bevel';  
  ctx.lineCap = 'round' ;
  ctx.lineWidth = 12 ;   
}
function theme06(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = false;
  starthue = 300; 
  finalhue = 360;
  currentcolor = '#004C99';
  ctx.fillStyle = '#004C99';
  ctx.fillRect(0,0,canvas.width/4,canvas.height);
  ctx.fillStyle = '#A70042';
  ctx.fillRect(canvas.width/4,0,canvas.width/4,canvas.height);
  ctx.fillStyle = '#004C99';
  ctx.fillRect(2*canvas.width/4,0,canvas.width/4,canvas.height);
  ctx.fillStyle = '#A70042';
  ctx.fillRect(3*canvas.width/4,0,canvas.width/4,canvas.height);
  hue = 'orange' ;
  ctx.lineJoin = 'bevel';  
  ctx.lineCap = 'butt' ;
  ctx.lineWidth = 20 ;   
}

function theme07(){
  eraserON = false;
  eraser.style.background = 'yellow';
  hueOn = false;
  starthue = 300; 
  finalhue = 360;
  currentcolor = 'black';
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  hue = 'orange' ;
  ctx.lineJoin = 'round';  
  ctx.lineCap = 'butt' ;
  ctx.lineWidth = 15 ;   
}

async function sendthis(send){
  const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(send)
}
const response = await fetch('/imgapi', options)
}


submit.addEventListener('click', ()=>{
const nickname = document.getElementById('nickname').value;
if(!nickname){
  alert('Please tell "YOUR NICKNAME" in the input bar !!! \n (example :  Selfie Rakib, Jarjes , Mohatel ) ')
  return ;
}
window.confirm('Do you want to send what you drew in the canvas ? ');
var image = canvas.toDataURL('image/jpeg');
var likecount = 0 ; 
var idnum = 0 ;
const data = {nickname , image, likecount ,idnum};
console.log(data);
sendthis(data);
});

