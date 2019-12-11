class Galaxian2 extends Galaxian {
  constructor(gameWidth, gameHeight) {
    super(gameWidth, gameHeight)
    this.img1 = document.getElementById('baddie2-a')
    this.img2 = document.getElementById('baddie2-b')
    this.width = this.img1.width
    this.height = this.img1.height
    this.position = {
      x: gameWidth/ 2 - this.width / 2 + 40,
      y: gameHeight - this.height - 350
    }
    this.points = 300
  }
}