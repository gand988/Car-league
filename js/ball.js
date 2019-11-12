// ! ///////////////////////////////////////////////////////////////////////////////
// ! ///////////////////////////  BALL  ////////////////////////////////////////////
// ! ///////////////////////////////////////////////////////////////////////////////
/**
 * the ball had no speed, have only passive movement
 */

class Ball {
  constructor(world) {
    this.world = world;
    this.car = world.carArray;


    this.size = 32;

    this.pos = createVector(30, 400);
    this.lastPos = this.pos.copy();

    this.speed = createVector(0, 2);
    this.acc = createVector(0, 0)
    this.vel = createVector(0, 0);
  }

  render() {
    this.update();
    screenData(this);
    this.draw();
  }

  update() {

    if (this.pos.y + this.size > this.world.border.bottom - this.size - 5) {
      // this.vel.x = -this.vel.x / 0.9; 
      let p = 0.98;
      // this.vel.mult(this.world.ambient.friction);
      this.vel.mult(p);
      // this.pos.add(this.vel); 
    }
    // BOTTOM 
    if (this.pos.y + this.size / 2 > this.world.border.bottom) {
      this.acc.y = 0;
      this.vel.y = -this.vel.y / 2.5;
      this.pos.y = this.world.border.bottom - this.size / 2;
    }
    // TOP 
    if (this.pos.y - (this.size / 2) < this.world.border.top) {
      this.acc.y = 0;
      this.vel.y = -this.vel.y / 2.5;
      this.pos.y = this.world.border.top + (this.size / 2);
    }
    // LEFT 
    if (this.pos.x - (this.size / 2) < this.world.border.left) {
      this.acc.x = 0;
      this.vel.x = -this.vel.x / 2.5;
      this.pos.x = this.world.border.left + (this.size / 2)
    }
    // RIGHT 
    if (this.pos.x + (this.size / 2) > this.world.border.right) {
      this.acc.x = 0;
      this.vel.x = -this.vel.x / 2.5;
      this.pos.x = this.world.border.right - (this.size / 2);
    }

    // collision with the ball
    // todo : atm when the ball is on the car, the acc == 0;
    world.carArray.forEach((e)=>{
      if (collide(this, e)) {
        if (this.border.bottom > e.border.top) {
          this.acc = createVector(0, 0);
          this.vel = createVector(0, 0);
          this.pos.y = e.border.top - this.size / 2;
        }
      }
    })

    this.acc.add(this.world.ambient.gravity);
    this.acc.mult(this.world.ambient.friction);
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // console.log(this.vel)
    this.lastPos = this.pos.copy();
  }


  draw() {

    fill('#3d6dd1');
    // rectMode(CENTER); 
    square(
      this.pos.x,
      this.pos.y,
      this.size
    )
    image(textBall, this.border.left, this.border.top, texture.width, texture.height)
  }

  get border() {
    return {
      top: this.pos.y - this.size / 2,
      bottom: this.pos.y + this.size / 2,
      left: this.pos.x - this.size / 2,
      right: this.pos.x + this.size / 2
    }
  }
}