class Galaxian {
    constructor(gameWidth, gameHeight, locateShip, enemyFire) {
        this.gameWidth = gameWidth
        this.velocity = {
            x: 0,
            y: 0
        }
        this.maxSpeed = 7
        this.speed = 0
        this.locateShip = locateShip
        this.fire = enemyFire
        this.markedForDeletion = false
        this.setFlightPattern()
        this.setAttackPattern()
    }
    shoot() {
        this.fire({...this.location }, this)
    }
    setAttackPattern() {
        let rand = Math.floor(Math.random() * 3000) + 500
        setTimeout(() => {
                this.shoot()
                this.setAttackPattern()
            },
            rand)

    }

    setFlightPattern() {
        let rand = Math.floor(Math.random() * 3000) + 100
        setTimeout(() => {
            this.velocity = {
                x: Math.floor(Math.random() * 100) + -20,
                y: Math.floor(Math.random() * -100) + -20
            }
            setTimeout(() => {
                this.velocity = {
                    x: Math.floor(Math.random() * 100) + 50,
                    y: Math.floor(Math.random() * 100) + 20
                }
                setTimeout(() => {
                    this.velocity = {
                        x: Math.floor(Math.random() * -100) + -50,
                        y: Math.floor(Math.random() * 100) + 20
                    }
                    setTimeout(() => {
                        this.velocity = {
                            x: Math.floor(Math.random() * 100) + 50,
                            y: Math.floor(Math.random() * 100) + 20
                        }
                        setTimeout(() => {
                            this.velocity = {
                                x: Math.floor(Math.random() * 100) + -100,
                                y: Math.floor(Math.random() * -100) + -20
                            }
                            setTimeout(() => {
                                this.velocity = {
                                    x: Math.floor(Math.random() * 100) + 20,
                                    y: Math.floor(Math.random() * 100) + 20
                                }
                                this.setFlightPattern()
                            }, rand)
                        }, rand)
                    }, rand)
                }, rand)
            }, rand)
        }, rand)
    }
    update() {
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