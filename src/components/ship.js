class Ship {
  constructor(gameWidth, gameHeight) {
    this.width = 100;
    this.height = 90;
    
    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    }
  }

  draw(ctxt) {
    ctxt.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
} 