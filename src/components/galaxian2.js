class Galaxian2 extends Galaxian {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.img1 = document.getElementById('baddie2-a')
        this.img2 = document.getElementById('baddie2-b')
        this.width = this.img1.width
        this.height = this.img1.height
        this.location = {
            x: gameWidth / 2 - this.width / 2 - 250,
            y: gameHeight - this.height - 600
        }
        this.points = 300
    }
}