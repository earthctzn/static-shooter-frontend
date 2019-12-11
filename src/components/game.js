// class Game {
//   constructor() { 
//     this.adapter = new GameAdapter()
//     this.bullets =  []
//     this.galaxians = []
//     this.inputHandlers = []
//     this.bindingsAndListeners()
//     this.startAtack()
//     this.createGalaxians()
//     this.createShip()
    
//   }
//   bindingsAndListeners() {
//     this.canvas = document.querySelector('#gameSpace');
//     this.ctx = this.canvas.getContext('2d')
//     this.gameWidth = this.canvas.width;
//     this.gameHeight = this.canvas.height;
//     this.lastTime = 0
//     this.newShip = new Ship(this.gameWidth, this.gameHeight)
//     new InputHandler(this.newShip)

//   }
//   startAtack() {

//   }
//   createGalaxians() {
//     //I need to be able to add a number of galaxians of all types with both images for each.
//     this.galaxians.push(new Galaxian(this.gameWidth, this.gameHeight))
//     for (let g of this.galaxians)
//     g.draw(this.ctx)
//   }
//   createShip() {
  
//     this.newShip.draw(this.ctx);
//   }
    const canvas = document.querySelector('#gameSpace');
    const ctx = canvas.getContext('2d')
    const gameWidth = canvas.width;
    const gameHeight = canvas.height;
    let lastTime = 0
    let newShip = new Ship(gameWidth, gameHeight)
    let galaxian = new Galaxian(gameWidth, gameHeight)
    new InputHandler(newShip)
  

  function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime
    lastTime = timestamp

    ctx.clearRect(0,0, 800, 600);
    newShip.update(deltaTime);
    newShip.draw(ctx)
    galaxian.draw(ctx)
    requestAnimationFrame(gameLoop)
  }
gameLoop()
// }




