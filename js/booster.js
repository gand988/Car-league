// ! ///////////////////////////////////////////////////////////////////////////////
// ! /////////////////////////  BOOSTER CORE  //////////////////////////////////////
// ! ///////////////////////////////////////////////////////////////////////////////

class BoosterCore {
  constructor(world, x) {
    this.id = null; 
    this.world = world;
    // this.car = world.car;
    this.car = world.carArray;
    this.x = x;

    this.color = {
      /**
       * on = booster can be pick up 
       * off = wait to spawn  
       */
      on: color('#ffc107'),
      off: color("rgba(100%, 60%, 1%, 0.1)"),
      current: color('#ffc107')
    }

    // pickup become false when some one pick the booster.
    this.pickup = true;

    this.respawn_time = 5 * 1000; 
    this.size = {
      w: 0,
      h: 10,
      step: 0.25, 
      stepH : 0.25
    }

    this.pos = {
      x: this.x ,
      y: canvasHeight - this.size.h / 2
    }
  }

  render() {
    this.update();
    this.draw();
  }

  update() {
    
    
    this.carsPick();
    this.animation();
    this.draw();
  }
  

  carsPick(){
    // thanks to Tora to suggesting me to use the arrow function
    // for preserving the scope of 'this'
    if(world.carArray){
      world.carArray.forEach((e)=> {
        if(collide(this, e) && this.pickup == true){
          this.pickup = false; 
          this.color.current = this.color.off; 
          respawn(this); 
          e.boostData.tank = 100; 
        }
      }); 
    }
  }

  spawnBooster() {
    console.log("booster")
    this.color.current = this.color.on;
    this.valuePicker = false;
  }

  animation() {
    if (this.size.w >= 9) {
      this.size.step = -0.25;
    } else if (this.size.w <= -10) {
      this.size.step = 0.25;
    }
    // todo : add up and down animation 
    // * problem : with the animation the base will go up and down.
    this.size.w += this.size.step;
    this.pos.y += this.size.step; 
  }

  

  draw() {
    fill(this.color.current);
    rectMode(CENTER);
    rect(
      this.pos.x,
      this.pos.y - 5,
      this.size.w,
      this.size.h
    )
    // this is the base
    fill("#ffc107")
    rect(
      this.pos.x,
      this.world.border.bottom,
      20,
      5)
    text(
      `pick ${this.pickup} `,
      this.border.right,
      this.border.top);
  }

  get border() {
    return {
      top: this.pos.y - this.size.h / 2,
      bottom: this.pos.y + this.size.h / 2,
      left: this.pos.x - this.size.h / 2,
      right: this.pos.x + this.size.h / 2
    }
  }
}

function respawn(a){
  setTimeout(function () {
    // world.booster.pickup = true; 
    a.pickup = true; 
    a.color.current = a.color.on; 
  }, a.respawn_time)
}
