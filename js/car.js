// ! ///////////////////////////////////////////////////////////////////////////////
// ! ///////////////////////////  CAR  /////////////////////////////////////////////
// ! ///////////////////////////////////////////////////////////////////////////////

class Car {
  constructor(world, color) {
    this.world = world;
    this.ball = world.ball;
    this.booster = world.booster;

    this.color = color; 
    this.size = 20;
    this.jump = {
      h: 0.9,
      jump: true
      // when you hit the ground you can jump again 
    }

    this.HORSE_POWER = 0.3; // thanks to Flesh38 || twitch.tv 25/10/2019
    // this.HORSE_POWER = 0.15; // ! value for testing 
    // this.pos = createVector(30, canvasHeight);
    this.pos = createVector(random(canvasWidth), canvasHeight);
    this.lastPos = this.pos.copy();

    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);

    this.boostData = {
      tank : 0
      // tank: 100
    };
  }


  render() {
    this.update();
    screenData(this);
    text(
      `B: ${this.boostData.tank}`,
      this.border.right,
      this.border.top - 30);
    this.draw();
  }

  update() {
    // this.movement();

    // collision with the bottom of the screen 
    // * BOTTOM
    if (this.pos.y + (this.size / 2) > this.world.border.bottom) {
      this.pos.y = this.world.border.bottom - this.size / 2;
      // reset the jump 
      this.jump.jump = true;
    }
    // * TOP 
    if (this.pos.y - (this.size / 2) < this.world.border.top) {
      this.pos.y = this.world.border.top + (this.size / 2);
    }
    // * LEFT 
    if (this.pos.x - (this.size / 2) < this.world.border.left) {
      this.acc.x = 0;
      this.pos.x = this.world.border.left + (this.size / 2);
    }
    // * RIGHT 
    if (this.pos.x + (this.size / 2) > this.world.border.right) {
      this.pos.x = 0;
      this.pos.x = this.world.border.right - (this.size / 2);
    }

    // todo : collision ------------------------------------------------------------------
    // todo : collision ------------------------------------------------------------------
    // todo : collision ------------------------------------------------------------------

    if (this.ball) {
      if (collide(this, this.ball)) {
        let a = this.border; // car 
        let b = this.ball.border; // ball
        // a top - b bottom
        if (a.top <= b.bottom) {
          this.ball.vel.add(this.vel);
        }
        if (a.bottom >= b.top) {
          this.ball.vel.add(this.vel);
        }
        if (a.left <= b.right) {
          this.ball.vel.add(this.vel);
        }
        if (a.right >= b.left) {
          this.ball.vel.add(this.vel);
        }
      }
      this.ball.pos.add(this.ball.vel)
    }

    // todo : booster ------------------------------------------------------------------
    // todo : booster ------------------------------------------------------------------
    // todo : booster ------------------------------------------------------------------

    this.useBooster();
    this.lastPos = this.pos.copy();

    // movement stuff 
    // todo : movement ------------------------------------------------------------------
    // todo : movement ------------------------------------------------------------------
    // todo : movement ------------------------------------------------------------------

    this.movement();
    if (this.pos.y + this.size < this.world.border.bottom) {
      this.acc.add(this.world.ambient.gravity);
      this.acc.mult(this.world.ambient.friction)
    } else {
      // this.pos.y = this.world.border.bottom - this.size; 
    }
    // acc is costant , when we don't press any key acc is 0
    this.vel.add(this.acc);
    // todo : check in the future 
    // * talk with Skat to see if is better to have a number 0 or have a float going down ~
    // this.vel.mult(0.9001); 
    this.vel.mult(this.world.ambient.friction); // current 0.9001
    // console.log(this.vel.x, this.vel.y);
    this.pos.add(this.vel);
  }
  // ! end UPDATE 

  // todo : use booster 
  /**
   * premendo la spacebar, riceviamo accelerazione 
   * 
   * macchina ferma = accelerazione verso l'alto ^
   * macchina verso sinistra = acc a sinistra 
   * macchina verso destra = acc verso destra
   *    : no key -> verso l'alto 
   *    : left -> verso sinistra 
   *    : right -> verso destra 
   *    : down -> verso il basso 
   * Rocket league : 
   * quando premiamo il booster andiamo nella direzione nella quale il muso 
   * della macchina punta.
   * 
   * 
   * quando siamo in volo, togliamo l'accelerazione della pressione dei tasti, 
   * dopo una certa altezza.
   * 
   */

  useBooster() {
    if (keyIsDown(SPACEBAR) && this.boostData.tank > 0) {
      // this.test = createVector(0,-1); 
      
      if(keyIsDown(SPACEBAR) && keyIsDown(UP_ARROW)){
        this.acc = createVector(0,-0.25);
      }else if(keyIsDown(SPACEBAR) && keyIsDown(DOWN_ARROW)){
        this.acc = createVector(0,0.25)
      }else if (keyIsDown(SPACEBAR)) {
        this.acc = createVector(0, -0.25);
      }
      this.boostData.tank -= 1;
      // this.boostData.direction = createVector(0, -0.1)
      this.vel.add(this.acc); 
      this.pos.add(this.vel); 
      // if(keyIsDown(UPPER_ARROW)){
//! 555555555555555555555555555555555555555555555555555555555555555555555555555555
//! 555555555555555555555555555555555555555555555555555555555555555555555555555555
//! 555555555555555555555555555555555555555555555555555555555555555555555555555555
//! 555555555555555555555555555555555555555555555555555555555555555555555555555555
//! 555555555555555555555555555555555555555555555555555555555555555555555555555555
      // }

    }
  }

  // * movement of the car
  movement() {
    //horse power == 0.3
    if (keyIsDown(LEFT_ARROW)) {
      // this.acc = createVector(-this.HORSE_POWER,0); 
      this.acc.x = -this.HORSE_POWER;
    } else {
      this.acc.x = 0;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      // this.acc = createVector(this.HORSE_POWER,0)
      this.acc.x = this.HORSE_POWER;
    } else {
      // this.acc.x = 0; 
    }
    if (keyIsDown(UP_ARROW)) {
      // this.acc = createVector(0, -0.5)
      // this.acc.y = -this.HORSE_POWER
      if (this.pos.y >= this.world.ambient.jump && this.jump.jump) {
        this.acc.y = -.9
        this.jump.jump = false;
      } else {
        // this.acc.y = 0; 
      }
    } else {
      // this.acc = createVector(0, 0)
      // this.acc.y = 0; 
    }
    if (keyIsDown(DOWN_ARROW)) {
      // this.acc = createVector(0, -0.5)
      this.acc.y = 0.1
    } else {
      // this.acc = createVector(0, 0)
      // this.acc.y = 0; 
    }


  }

  draw() {
    fill(this.color);
    // rectMode(CENTER); 
    square(
      this.pos.x,
      this.pos.y,
      this.size
    );
    // image(textCar, this.border.left, this.border.top, texture.width, texture.height)


  }

  get border() {
    return {
      top: this.pos.y - (this.size / 2),
      bottom: this.pos.y + (this.size / 2),
      left: this.pos.x - (this.size / 2),
      right: this.pos.x + (this.size / 2)
    }
  }

}