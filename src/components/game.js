
const canvas = document.getElementById("gameSpace");
const ctx = canvas.getContext('2d')
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
// const i = document.getElementById('ship')
ctx.clearRect(0,0, 800, 600);

let newShip = new Ship(GAME_WIDTH, GAME_HEIGHT);

newShip.draw(ctx);


// function Loop() {

// }
// // ctx.fillStyle = '#f00'
// ctx.drawImage(i, 130, 130, 20, 10)

// class Game {
//   constructor() { 
//     this.adapter = new GameAdapter()
  
//   }



  





// }


