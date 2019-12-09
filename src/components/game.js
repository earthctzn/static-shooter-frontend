class Game {
  constructor() { 
    this.adapter = new GameAdapter()
  
  }
  
  ctx() {
    let canvas = document.getElementById("gameSpace");
    let ctx = canvas.getContext('2d')
    return ctx
  }

  

  // const GAME_WIDTH = 800;
  // const GAME_HEIGHT = 600;

  // clearRect(0,0, 800, 600);

  // let ship = new Ship(GAME_WIDTH, GAME_HEIGHT);

  // ship.draw(ctxt);

}
