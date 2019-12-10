class Ship {
  
  constructor(gameWidth, gameHeight) {
    this.img = document.getElementById('ship')
    // this.missile = document.getElementById('goodMissile')
    this.width = this.img.width
    this.height = this.img.height
    this.position = {
      x: gameWidth/ 2 - this.width / 2,
      y: gameHeight - this.height - 30
    }
  }

  draw(ctx) {
    // ctx.clearRect(0, 0, 800, 600)
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.position.x += 5 / deltaTime;
  }


  // shoot(ctx) {
  //   ctx.drawImage(this.missile)
  // }
} 