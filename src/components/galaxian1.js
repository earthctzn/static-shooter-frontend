class Galaxian1 extends Galaxian {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.img1 = document.querySelector('#baddie1-a')
        this.img2 = document.querySelector('#baddie1-b')
        this.width = this.img1.width
        this.height = this.img1.height
        this.changeImage()
        this.location = {
            x: gameWidth / 2 - this.width / 2 + 40,
            y: gameHeight - this.height - 650
        }
        this.points = 100
    }



    changeImage() {
        this.interval = setInterval(() => {
            requestAnimationFrame(this.changeImage.bind(this));

            const url = this.img1.src;

            if (url == "/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-A.png") {
                url = document.getElementById('baddie1-a').src = "/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-B.png";
            } else if (url == "/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-B.png") {
                url = document.getElementById('baddie1-a').src = "/Users/Caleb/Development/code/static-shooter-frontend/resources/sprites/baddie1-A.png";
            }
        }, 1000)

    }
}