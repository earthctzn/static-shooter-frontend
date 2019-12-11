class Galaxian {
  constructor(gameWidth, gameHeight) {
    this.img1 = document.getElementById('baddie1-a')
    this.img2 = document.getElementById('baddie1-b')
    // this.missile = document.getElementById('goodMissile')
    this.gameWidth = gameWidth
    this.width = this.img1.width
    this.height = this.img1.height
    this.maxSpeed = 7
    this.speed = 0
    this.position = {
      x: gameWidth/ 2 - this.width / 2,
      y: gameHeight - this.height - 30
    }
  }

  draw(ctx) {
    ctx.drawImage(this.img1,this.width, this.height)
  }
}