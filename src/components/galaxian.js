class Galaxian {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.velocity = {
            x: 0,
            y: 0
        }
        this.maxSpeed = 7
        this.speed = 0
        this.markedForDeletion = false
        this.setFlightPattern()
    }

    setFlightPattern() {
        setTimeout(() => {
            this.fire({...this.location })
            this.velocity = {
                x: 35,
                y: 5
            }
            setTimeout(() => {
                this.fire({...this.location })
                this.velocity = {
                    x: 20,
                    y: 7
                }
                setTimeout(() => {
                    this.fire({...this.location })
                    this.velocity = {
                        x: -25,
                        y: -6
                    }
                    setTimeout(() => {
                        this.fire({...this.location })
                        this.velocity = {
                            x: 20,
                            y: 0
                        }
                        setTimeout(() => {
                            this.fire({...this.location })
                            this.velocity = {
                                x: -30,
                                y: 0
                            }
                            setTimeout(() => {
                                this.fire({...this.location })
                                this.velocity = {
                                    x: -40,
                                    y: -3
                                }
                                this.setFlightPattern()
                            }, 2000)
                        }, 2000)
                    }, 2000)
                }, 1000)
            }, 2000)
        }, 2000)
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