class Ship {
    constructor(gameWidth, gameHeight, location = false) {
        this.img = document.getElementById('ship')
        this.gameWidth = gameWidth
        this.width = this.img.width
        this.height = this.img.height
        this.maxSpeed = 6
        this.speed = 0
        this.markedForDeletion = false
        if (!location) {
            this.location = {
                x: gameWidth / 2 - this.width / 2,
                y: gameHeight - this.height - 40
            }
        } else {
            this.location = location
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