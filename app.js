var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'black';

var ctx = canvas.getContext('2d');

var radius = 5;

function Ball(radius, color){

  this.x = Math.floor(Math.random() * (canvas.width - radius - 1));
  this.y = Math.floor(Math.random() * (canvas.height - radius - 1));
  this.color;
  this.radius = radius;
  this.steps = 120;
  this.counter = 0;
  this.nextPointX = Math.floor(Math.random() * (canvas.width - radius - 1));
  this.nextPointY = Math.floor(Math.random() * (canvas.height - radius - 1));
  this.dx = (this.nextPointX - this.x)/this.steps;
  this.dy = (this.nextPointY - this.y)/this.steps;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.shadowBlur = 40;
    ctx.shadowColor = 'yellow';
    // ctx.globalAlpha = 0.6;
    ctx.closePath();
  }

  this.calculateNewDxDy = function(){
      this.counter = 0;
      this.nextPointX = Math.floor(Math.random() * (canvas.width - radius - 1));
      this.nextPointY = Math.floor(Math.random() * (canvas.height - radius - 1));
      this.dx = (this.nextPointX - this.x)/this.steps;
      this.dy = (this.nextPointY - this.y)/this.steps;
  }


  this.update = function(){

    this.x += this.dx;
    this.y += this.dy;
    this.counter++;
    this.draw();

    if(this.counter === this.steps){
      this.calculateNewDxDy();
    }
  }
}

var ballArray = [];
const colors = ['#4deeea', '#74ee15', '#ffe700', '#f000ff', '#001eff', '#ff0303', '#8400ff', '#00fff6', '#0028ff', '#00ff28', '#ffa300', '#cf0060', '#ff00ff', '#13a8fe', '#4e87a4', '#b0d5ce', '#fff1e4', '#fa86ab', '#ee2889','#7b297d', '#e87888', '#eae8e5', '#b1185a','#c351a2', '#efa9df', '#f3cff1']

function generateBalls(number){
  for (var i = 0; i < number; i++){
    var color = colors[Math.floor(Math.random() * (colors.length - 1))];
    var ball = new Ball(radius, color);
    ballArray.push(ball);
  }
}

function init(){
  for (var i = 0; i < ballArray.length; i++){
    ballArray[i].draw();
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++){
    ballArray[i].update();
  }
}

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ballArray =[];
    generateBalls(100);
    init();
});

generateBalls(100);
init();
animate();