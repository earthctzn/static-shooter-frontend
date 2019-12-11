class Galaxian {
  constructor(gameWidth, gameHeight) {
    // this.missile = document.getElementById('badMissile')
    this.gameWidth = gameWidth
    // this.width = this.img1.width
    // this.height = this.img1.height
    this.maxSpeed = 7
    this.speed = 0
    // this.position = {
    //   x: gameWidth/ 2 - this.width / 2,
    //   y: gameHeight - this.height - 30
    // }
  }
  // flapWings() {
  //   const enemy2 = document.getElementById('baddie2-a').src
  //   const enemy1 = document.getElementById('baddie1-a').src
  //   if (enemy1 == '/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-A.png') {
  //       document.getElementById('baddie1-a').src = '/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-A.png'
  //   } else {
  //       document.getElementById('baddie1-a').src = '/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-B.png'
  //   }
  //   if (enemy2 == '/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie2-A.png') {
  //     document.getElementById('baddie2-a').src = '/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie2-A.png'
  //   } else {
  //     document.getElementById('baddie2-a').src = '/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie2-B.png'
  //   }
  // }
  draw(ctx) {
    ctx.drawImage( this.img1, this.position.x, this.position.y, this.width, this.height)
  }
}