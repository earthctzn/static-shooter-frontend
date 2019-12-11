class Galaxian1 extends Galaxian {
  constructor(gameWidth, gameHeight) {
    super(gameWidth, gameHeight)
    this.img1 = document.getElementById('baddie1-a')
    this.img2 = document.getElementById('baddie1-b')
    this.width = this.img1.width
    this.height = this.img1.height
    this.position = {
      x: gameWidth/ 2 - this.width / 2 + 40,
      y: gameHeight - this.height - 150
    }
    this.points = 100
  }

  // draw(ctx) {
  //   ctx.drawImage(this.img1, this.position.x, this.position.y, this.width, this.height)
  // }
}