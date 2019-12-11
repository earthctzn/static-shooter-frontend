
const canvas = document.getElementById("gameSpace");
const ctx = canvas.getContext('2d')
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
// const i = document.getElementById('ship')
// let space = new Space(GAME_WIDTH, GAME_HEIGHT)


let galaxian = new Galaxian(GAME_WIDTH, GAME_HEIGHT)
let newShip = new Ship(GAME_WIDTH, GAME_HEIGHT);

newShip.draw(ctx);
new inputHandler(newShip);

let lastTime = 0


function loop(timestamp) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  ctx.clearRect(0,0, 800, 600);
  newShip.update(deltaTime);
  newShip.draw(ctx)
  galaxian.draw(ctx)
  requestAnimationFrame(loop)
}
loop()


// class Game {
//   constructor() { 
//     this.adapter = new GameAdapter()
  
//   }



  





// }


