class Galaxian2 extends Galaxian {
    constructor(gameWidth, gameHeight, locateShip, enemyFire) {
        super(gameWidth, gameHeight, locateShip, enemyFire)
        this.img1 = document.getElementById('baddie2-a')
        this.img2 = document.getElementById('baddie2-b')
        this.width = this.img1.width
        this.height = this.img1.height
        this.points = 300
        let rand = Math.floor(Math.random() * 301) + -300
        let rand2 = Math.floor(Math.random() * 400) + 300
        this.location = {
            x: gameWidth / 2 - this.width / 2 + rand,
            y: gameHeight - this.height - rand2
        }
    }

    reset(gameWidth, gameHeight) {
        let rand = Math.floor(Math.random() * 301) + -300
        let rand2 = Math.floor(Math.random() * 400) + 300
        this.location = {
            x: gameWidth / 2 - this.width / 2 + rand,
            y: gameHeight - this.height - rand2
        }
    }
}