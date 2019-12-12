class Ship {
  
  constructor(gameWidth, gameHeight) {
    this.img = document.getElementById('ship')
    // this.missile = document.getElementById('goodMissile')
    this.gameWidth = gameWidth
    this.width = this.img.width
    this.height = this.img.height
    this.maxSpeed = 6
    this.speed = 0
    this.goodBullets = []
    this.location = {
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

  stop() {
    this.speed = 0
  }

  draw(ctx) {
    // ctx.clearRect(0, 0, 800, 600)
    ctx.drawImage(this.img, this.location.x, this.location.y, this.width, this.height)
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.location.x += this.speed
    if (this.location.x < 0) this.location.x = 0
    if (this.location.x + this.width > this.gameWidth)
      this.location.x = this.gameWidth - this.width
  }

} 