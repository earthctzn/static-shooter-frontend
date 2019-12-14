class Game {
    constructor() {
        // this.adapter = new GameAdapter()

        this.bullets = []
        this.galaxians = []
        this.bindingsAndListeners()
        this.createGalaxians()
        this.addGalaxians()
        this.createShip()
        this.gameLoop()
            // this.startAttack()
    }

    bindingsAndListeners() {
        this.canvas = document.getElementById('gameSpace');
        this.ctx = this.canvas.getContext('2d')
        this.gameWidth = this.canvas.width;
        this.gameHeight = this.canvas.height;
        this.lastTime = 0
        this.deltaTime = 0
    }

    shipFire(startingLoc) {
        const goodBullet = new GoodBullet(startingLoc)
        this.bullets.push(goodBullet)
    }
    enemyFire(startingLoc) {
        const badBullet = new BadBullet(startingLoc)
        this.bullets.push(badBullet)
    }
    addGalaxians() {
        const galaxian1 = new Galaxian1(this.gameWidth, this.gameHeight)
        const galaxian2 = new Galaxian2(this.gameWidth, this.gameHeight)
        this.galaxians.push(galaxian1, galaxian2)
        for (let g of this.galaxians) {
            g.getShipLoc = this.locateShip.bind(this)
            g.fire = this.enemyFire.bind(this)
        }
    }

    locateShip() {
        return this.ship.location
    }

    createGalaxians() {
        //I need to be able to add a number of galaxians of all types with both images for each.
        for (let g of this.galaxians)
            g.draw(this.ctx)
    }

    createShip() {
        this.ship = new Ship(this.gameWidth, this.gameHeight)
        new InputHandler(this.ship)
        this.ship.fire = this.shipFire.bind(this)
        this.ship.draw(this.ctx);
    }
    startAttack() {
        this.interval = setInterval(() => {
            this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)
            for (let p of this.galaxians) {
                p.updateLocation()
                p.draw(this.ctx)
                p.fire({...p.location })
                const newEnemies = this.galaxians.filter(p => p.location.y < 600)
                const lostEnemies = this.galaxians.length - newEnemies.length
                this.galaxians = newEnemies
                for (let i = 0; i < lostEnemies; i++) {
                    this.addGalaxians()
                }
            }
        }, 10)
    }
    gameLoop(timestamp) {
        this.deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        for (let b of this.bullets) {
            b.update(this.deltaTime)
            b.draw(this.ctx)
        }
        this.ship.update(this.deltaTime);
        this.ship.draw(this.ctx)
        this.createGalaxians()
        requestAnimationFrame(this.gameLoop.bind(this))
    }
}











// const canvas = document.getElementById('gameSpace');
// const ctx = canvas.getContext('2d')
// const gameWidth = canvas.width;
// const gameHeight = canvas.height;
// let lastTime = 0
// let ship = new Ship(gameWidth, gameHeight)
// let galaxian = new Galaxian(gameWidth, gameHeight)
// new InputHandler(ship)

//   function gameLoop(timestamp) {

//     let deltaTime = timestamp - lastTime
//     lastTime = timestamp

//     ctx.clearRect(0,0, gameWidth, gameHeight);

//     ship.update(deltaTime);
//     ship.draw(ctx)
//     galaxian.draw(ctx)
//     looper();
//     // setInterval(flapWings, 500)
//     requestAnimationFrame(gameLoop)
//   }
// gameLoop()
// }