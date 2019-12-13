class BadBullet extends Bullet {
    constructor(startingLoc = { x: 380, y: 530 }, velocity = { x: 0, y: 0.35 }, size = { x: 30, y: 30 }) {
        super(startingLoc, velocity, size)
        this.imag = document.getElementById('badBullet')
    }
}