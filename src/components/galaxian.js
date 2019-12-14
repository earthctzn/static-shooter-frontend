class Galaxian {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.velocity = {
            x: 10,
            y: 10
        }
        this.maxSpeed = 7
        this.speed = 0
        this.setFlightPattern()
    }

    setFlightPattern() {
        setTimeout(() => {
            this.velocity = {
                x: 1000,
                y: 10
            }
            setTimeout(() => {
                this.velocity = {
                    x: 0,
                    y: 90
                }
                setTimeout(() => {
                    this.velocity = {
                        x: -100,
                        y: -100
                    }
                    setTimeout(() => {
                        this.velocity = {
                            x: 100,
                            y: -100
                        }
                        setTimeout(() => {
                            this.velocity = {
                                x: 100,
                                y: 100
                            }
                            setTimeout(() => {
                                this.velocity = {
                                    x: -100,
                                    y: 100
                                }
                                this.setFlightPattern()
                            }, 200)
                        }, 200)
                    }, 200)
                }, 200)
            }, 1000)
        }, 1000)
    }
    updateLocation() {
        this.location = {
            x: this.location.x + this.velocity.x * 0.01,
            y: this.location.y + this.velocity.y * 0.01
        }
        if (this.location.x >= 580 || this.location.x <= 0) {
            this.velocity.x = -1 * this.velocity.x
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img1, this.location.x, this.location.y, this.width, this.height)
    }
}