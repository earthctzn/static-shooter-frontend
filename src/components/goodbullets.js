class GoodBullet extends Bullet {
  constructor(startingLoc= {x: 380, y: 500}, velocity = { x: 0, y: -0.01}, size = {x: 30, y: 30}){
    super(startingLoc= {x: 380, y: 500}, velocity, size)
    this.imag = document.getElementById('goodBullet')


  }

}