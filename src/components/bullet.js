class Bullet {
    constructor(startingLoc = { x: 380, y: 530 }, velocity, size) {
        this.location = startingLoc
        this.size = size
        this.velocity = velocity
    }

    update(deltaTime, game) {
        if (!deltaTime) return;
        this.location.x += this.velocity.x * deltaTime
        this.location.y += this.velocity.y * deltaTime
    }

    draw(ctx) {
        ctx.drawImage(this.imag, this.location.x, this.location.y, this.size.x, this.size.y)
    }
}