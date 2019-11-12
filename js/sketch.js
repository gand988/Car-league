/**
 * Codepen Link : 
 * https://codepen.io/gand988/pen/pooPJpe
 * 
 * this.HORSE_POWER = 0.3; // thanks to Flesh38 || twitch.tv 25/10/2019
 * use of world.car to fix the problem // thanks to Yadugaran @ twitch.tv 27/10/2019
 */


/*
 *    /\    /\    /\    /\    /\    /\    /\    /\    /\    /\    /\    /\   |||
 *   //\\  //\\  //\\  //\\  //\\  //\\  //\\  //\\  //\\  //\\  //\\  //\\  |||
 * \///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\/|||
 * \\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\/  \\\|||
 * \\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\\  /\\|||
 * /\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\\\///\|||
 *   \\//  \\//  \\//  \\//  \\//  \\//  \\//  \\//  \\//  \\//  \\//  \\//  |||
 *    \/    \/    \/    \/    \/    \/    \/    \/    \/    \/    \/    \/   |||
*/

// p5 functions
let world;
let canvasWidth = 500;
let canvasHeight = 500;

// let texture; 
let textBall; 
let textCar; 
let textBoost; 


function setup() {
  // texture = loadImage('texture.png'); 
  textBall = loadImage('./assets/ball32.png'); 
  textCar = loadImage('./assets/car20.png'); 
  textBoost = loadImage('./assets/booster10.png'); 
  createCanvas(canvasWidth, canvasHeight);
  world = new World();
  frameRate(60)
}

function draw() {
  background("#272727");
  // image(texture, 0, 0, texture.width, texture.height)
  world.render();
  textSize(32);
  noStroke();
  fill(0, 102, 153);
  text('Rocket Car ', canvasWidth / 3, 30);
  text('UP arrow to jump ', canvasWidth / 3, 30 + 32);
  text('Spacebar to boost', canvasWidth / 3, 30 + 32 + 32);
}

/**
  #3d6dd1
  #e43b34
  #dc6e4b
  #a3e2dc
 */
let SPACEBAR = 32;
let V = 86;

function keyPressed() {
  // console.log(keyCode)
}


let collide = function (a, b) {
  if (
    a.border.left <= b.border.right &&
    a.border.right >= b.border.left &&
    a.border.top <= b.border.bottom &&
    a.border.bottom >= b.border.top
  ) {
    return true;
  }
  return false;
}

let screenData = (a) =>{
  textSize(10);
  noStroke();
  // text('b : ' + this.boostData.tank, this.border.right, this.border.top - 20);
  // text('x : ' + this.pos.x, this.border.right, this.border.top - 10);
  // text('y : ' + this.pos.y, this.border.right, this.border.top);
  // console.log(Object.keys(a))
  // if (Object.keys(a['boostData'])){
  //   console.log(Object.keys(a['boostData']))

  // }
  text(
    `p: ${a.pos.x} , ${a.pos.y}`,
    a.border.right,
    a.border.top - 20);
  text(
    `v: ${a.vel.x} , ${a.vel.y}`,
    a.border.right,
    a.border.top - 10);
  text(
    `a: ${a.acc.x} , ${a.acc.y} `,
    a.border.right,
    a.border.top);
}