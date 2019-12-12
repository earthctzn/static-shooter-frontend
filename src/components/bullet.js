class Bullet {
  constructor(startingLoc= {x: 380, y: 500}, velocity = {x: 0, y: -10}, size = {x:20, y: 20}){
    this.startingLoc = startingLoc
    this.size = size
    this.velocity = velocity
  }

   update(deltaTime) {
    if (!deltaTime) return;
    this.startingLoc.x += this.velocity.x * deltaTime
    this.startingLoc.y += this.velocity.y * deltaTime
    if (this.startingLoc.x < 0) this.startingLoc.x = 0
    if (this.startingLoc.x + this.width > this.gameWidth)
      this.startingLoc.x = this.gameWidth - this.width
   }

  draw(ctx){ 
    ctx.drawImage(this.imag, this.startingLoc.x, this.startingLoc.y, this.size.x, this.size.y)
  }
}