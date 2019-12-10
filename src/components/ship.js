class Ship {
  
  constructor(gameWidth, gameHeight) {
    this.img = document.getElementById('ship')
    // this.missile = document.getElementById('goodMissile')
    this.gameWidth = gameWidth
    this.width = this.img.width
    this.height = this.img.height
    this.maxSpeed = 7
    this.speed = 0
    this.position = {
      x: gameWidth/ 2 - this.width / 2,
      y: gameHeight - this.height - 30
    }
  }
  moveLeft() {
    this.speed = -this.maxSpeed
  }

  moveRight() {
    this.speed = this.maxSpeed
  }
  draw(ctx) {
    // ctx.clearRect(0, 0, 800, 600)
    ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height)
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.position.x += this.speed
    if (this.position.x < 0) this.position.x = 0
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width
  }


  // shoot(ctx) {
  //   ctx.drawImage(this.missile)
  // }
} 