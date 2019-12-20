class LivesManager {
    constructor(container, ctx, lives = 3) {
        this.container = container
        this._lives = lives
        this.ctx = ctx
        this.ships = [
            new Ship(800, 800, { x: 5, y: 760 }),
            new Ship(800, 800, { x: 55, y: 760 }),
            new Ship(800, 800, { x: 105, y: 760 })
        ]
        this.draw()
    }
    get lives() {
        return this._lives
    }
    decrementLives() {
        this._lives -= 1
        this.ships.pop()
        this.draw()
    }
    draw() {
        for (let ship of this.ships) {
            this.ctx.drawImage(ship.img, ship.location.x, ship.location.y, ship.width, ship.height)
        }
    }
}