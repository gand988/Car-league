class World {
  constructor() {
    this.ball = new Ball(this);
    // this.boosters = [new BoosterCore(this), new BoosterCore(this)];
    // this.booster = new BoosterCore(this);

    this.boosterArray = [
      new BoosterCore(this, 50),
      new BoosterCore(this, 100),
      new BoosterCore(this, 150),
      new BoosterCore(this, 200)
    ]; 
    // this.car = new Car(this, 'green')  
    // car ( this, color )
    this.carArray = [
      new Car(this, 'green')
    ]; 

    // world gravity and physics
    this.ambient = {
      gravity: createVector(0, canvasHeight * 0.000025),
      // friction: 0.98,
      friction: 0.9001,
      fieldFriction: {
        fr: 0.5,
        height: canvasHeight - 5
      },
      jump: 455
    }

    this.border = {
      top: 0,
      left: 0,
      right: canvasWidth,
      bottom: canvasHeight
    }
  }

  render() {
    this.ball.render();
    noStroke();
    // this.car.render();
    this.carArray.forEach(car => car.render()); 
    // this.booster.render();
    this.boosterArray.forEach(booster => booster.render()); 
    // this.boosters.forEach(booster => booster.render());
    stroke(255)
    // max jump, after this (lower number) only booster
    line(0, 455, canvasWidth, this.ambient.jump);
    // line where there is friction with the field
    // line(0, 495, canvasWidth, 495);

  }
}