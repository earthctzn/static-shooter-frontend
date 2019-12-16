class Game {
    constructor() {
        // this.adapter = new GameAdapter()

        this.bullets = []
        this.galaxians = []

        this.bindings()
        this.addGalaxians()
        this.createGalaxians()
        this.createShip()
        this.gameLoop()

    }

    bindings() {
        this.canvas = document.getElementById('gameSpace');
        this.ctx = this.canvas.getContext('2d')
        this.gameWidth = this.canvas.width;
        this.gameHeight = this.canvas.height;
        this.lastTime = 0
        this.deltaTime = 0
        const GAMESTATE = {
            PAUSED: 0,
            RUNNING: 1,
            MENU: 2,
            GAMEOVER: 3,
            NEWLVL: 4
        }
        this.gameState = GAMESTATE.MENU
    }

    shipFire(location) {
        const goodBullet = new GoodBullet(location)
        this.bullets.push(goodBullet)
    }
    enemyFire(location) {
        const badBullet = new BadBullet(location)
        this.bullets.push(badBullet)
    }
    addGalaxians() {
        const galaxian1 = new Galaxian1(this.gameWidth, this.gameHeight)
        const galaxian2 = new Galaxian2(this.gameWidth, this.gameHeight)
        this.galaxians.push(galaxian1, galaxian2)
        for (let g of this.galaxians) {
            g.getShipLoc = this.locateShip.bind(this)
            g.fire = this.enemyFire.bind(this)
            g.fly = this.startFlight.bind(this)
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

    checkCollision(obj1, obj2) {
        const bttmOfBul = obj1.location.y + obj1.size.y
        const topOfBul = obj1.location.y
        const topOfObj = obj2.location.y
        const bottomOfObject = obj2.location.y + obj2.height
        const leftOfObj = obj2.location.x
        const rightOfObj = obj2.location.x + obj2.width
        if (bttmOfBul <= topOfObj || topOfBul >= bottomOfObject) return false
        if (obj1.location.x >= rightOfObj || obj1.location.x + obj1.size.x <= leftOfObj) return false
        console.log('kill')
        return true
    }
    createShip() {
        this.ship = new Ship(this.gameWidth, this.gameHeight)
        new InputHandler(this.ship)
        this.ship.fire = this.shipFire.bind(this)
        this.ship.draw(this.ctx);
    }
    startFlight() {
        this.interval = setInterval(() => {
            this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)
            for (let p of this.galaxians) {
                p.updateLocation()
                p.draw(this.ctx)
                const newGalaxians = this.galaxians.filter(p => p.location.y > -6)
                const lostGalaxians = this.galaxians.length - newGalaxians.length
                this.galaxians = newGalaxians
                for (let i = 0; i < lostGalaxians; i++) {
                    this.addGalaxians()
                }
            }
        }, 3000)
    }
    gameLoop(timestamp) {
        this.deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        for (let b of this.bullets) {
            b.update(this.deltaTime, this)
            b.draw(this.ctx)
            if (b.constructor.name === "BadBullet") {
                this.checkCollision(b, this.ship)
            } else if (b.constructor.name == "GoodBullet") {
                for (let g of this.galaxians) {
                    this.checkCollision(b, g)
                }
            }
        }
        this.ship.update(this.deltaTime);
        this.ship.draw(this.ctx)
        this.createGalaxians()
            // this.startFlight()
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