class Ship {

    constructor(gameWidth, gameHeight, location = false) {
        this.img = document.getElementById('ship')
        this.exp1 = document.getElementById("boom-1")
        this.exp2 = document.getElementById("boom-2")
        this.exp3 = document.getElementById("boom-3")
        this.exp4 = document.getElementById("boom-4")
        this.exp5 = document.getElementById("boom-5")
            // this.missile = document.getElementById('goodMissile')
        this.gameWidth = gameWidth
        this.width = this.img.width
        this.height = this.img.height
        this.maxSpeed = 6
        this.speed = 0
        this.markedForDeletion = false
        if (!location) {
            this.location = {
                x: gameWidth / 2 - this.width / 2,
                y: gameHeight - this.height - 60
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