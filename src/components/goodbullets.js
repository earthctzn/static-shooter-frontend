class GoodBullet extends Bullet {
    constructor(startingLoc, velocity = { x: 0, y: -0.5 }, size = { x: 30, y: 30 }) {
        super(startingLoc, velocity, size)
        this.imag = document.getElementById('goodBullet')
    }
}