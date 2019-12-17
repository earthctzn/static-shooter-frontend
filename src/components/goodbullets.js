class GoodBullet extends Bullet {
    constructor(startingLoc, bulletVelocity = { x: 0, y: -0.5 }, size = { x: 30, y: 30 }) {
        super(startingLoc, bulletVelocity, size)
        this.imag = document.getElementById('goodBullet')
    }
}