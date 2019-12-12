class Bullet {
  constructor(missile, startingLoc= {x: 20, y: 20}, velocity = {x: 10, y: 10}, size = {x:20, y: 20}){
    this.size = size
    this.location = startingLoc
    this.velocity = velocity
    this.img = missile
  }

  draw(ctx){ 
    ctx.drawImage(this.img, this.location.x, this.location.y, this.size.x, this.size.y)
  }
}