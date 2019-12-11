class Game {
  constructor() { 
    // this.adapter = new GameAdapter()
    this.bullets =  []
    this.galaxians = []
    this.bindingsAndListeners()
    // this.startAtack()
    this.createGalaxians()
    this.createShip()
    this.gameLoop()
  }

  bindingsAndListeners() {
    this.canvas = document.getElementById('gameSpace');
    this.ctx = this.canvas.getContext('2d')
    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;
    this.lastTime = 0
    this.deltaTime = 0
    this.galaxian1 = new Galaxian1(this.gameWidth, this.gameHeight)
    this.galaxian2 = new Galaxian2(this.gameWidth, this.gameHeight)
    this.galaxians.push(this.galaxian1, this.galaxian2)
    console.log(this.galaxians)
    for (let g of this.galaxians) {
      g.getShipLoc = this.startAtack.bind(this)
    }
    this.ship = new Ship(this.gameWidth, this.gameHeight)
    new InputHandler(this.ship)
  }
  startAtack() {
    return this.ship.location
  }
  createGalaxians() {
    //I need to be able to add a number of galaxians of all types with both images for each.

    // this.galaxian1.draw(this.ctx)
    // this.galaxian2.draw(this.ctx)
    for (let g of this.galaxians)
    g.draw(this.ctx)
  }
  createShip() {
    this.ship.draw(this.ctx);
  }

  gameLoop(timestamp) {
    this.deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    this.ctx.clearRect(0,0, this.gameWidth, this.gameHeight);

    this.ship.update(this.deltaTime);
    this.ship.draw(this.ctx)
    this.createGalaxians()

    requestAnimationFrame(this.gameLoop.bind(this))
  }



}











    // const canvas = document.getElementById('gameSpace');
    // const ctx = canvas.getContext('2d')
    // const gameWidth = canvas.width;
    // const gameHeight = canvas.height;
    // let lastTime = 0
    // let ship = new Ship(gameWidth, gameHeight)
    // let galaxian = new Galaxian(gameWidth, gameHeight)
    // new InputHandler(ship)

//   function gameLoop(timestamp) {

//     let deltaTime = timestamp - lastTime
//     lastTime = timestamp

//     ctx.clearRect(0,0, gameWidth, gameHeight);

//     ship.update(deltaTime);
//     ship.draw(ctx)
//     galaxian.draw(ctx)
//     looper();
//     // setInterval(flapWings, 500)
//     requestAnimationFrame(gameLoop)
//   }
// gameLoop()
// }




