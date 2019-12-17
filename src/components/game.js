class Game {
    constructor() {
        // this.adapter = new GameAdapter()
        this.bullets = []
        this.galaxians = []
        this.ships = []
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
    enemyFire(location, galaxian) {
        if (!galaxian.markedForDeletion) {
            const badBullet = new BadBullet(location)
            this.bullets.push(badBullet)
        }

    }
    addGalaxians() {
        const galaxian1 = new Galaxian1(this.gameWidth, this.gameHeight, this.locateShip.bind(this), this.enemyFire.bind(this))
        const galaxian2 = new Galaxian2(this.gameWidth, this.gameHeight, this.locateShip.bind(this), this.enemyFire.bind(this))
        this.galaxians.push(galaxian1, galaxian2)
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
            // obj2.markedForDeletion = true
            // obj1.markedForDeletion = true
        return true
    }
    createShip() {
        this.ships.push(new Ship(this.gameWidth, this.gameHeight))
        for (let ship of this.ships) {
            new InputHandler(ship)
            ship.fire = this.shipFire.bind(this)
            ship.draw(this.ctx);
        }
    }

    gameLoop(timestamp) {
        this.deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp
        this.galaxians = this.galaxians.filter(p => !p.markedForDeletion)
        this.ships = this.ships.filter(obj => !obj.markedForDeletion)
        this.bullets = this.bullets.filter(obj => !obj.markedForDeletion)
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        //check for collisions with all bullet types
        for (let b of this.bullets) {
            b.update(this.deltaTime)
            b.draw(this.ctx)
            if (b.constructor.name === "BadBullet") {
                //check for collision btwn bad bullets and friendly ship
                for (let ship of this.ships) {
                    if (this.checkCollision(b, ship)) {
                        ship.markedForDeletion = true
                        b.markedForDeletion = true
                    }
                }
            } else if (b.constructor.name == "GoodBullet") {
                //check for collision btwn good bullets and enemy ships
                for (let g of this.galaxians) {
                    if (this.checkCollision(b, g)) {
                        g.markedForDeletion = true
                        b.markedForDeletion = true
                    }
                }
            }
        }
        //Check if any galaxian type is off the top or bottom of the screen
        for (let p of this.galaxians) {
            p.update()
            p.draw(this.ctx)
            if (p.location.y < 0) {
                p.markedForDeletion = true
            }
            if (p.location.y > 800 + p.height) {
                p.markedForDeletion = true
            }
        }
        // const newGalaxians = this.galaxians.filter(p => p.markedForDeletion == false)
        // const lostGalaxians = this.galaxians.legth - newGalaxians.length
        // this.galaxians = newGalaxians
        // for (let i = 0; i < lostGalaxians; i++) {
        //     this.createGalaxians()
        // }

        // console.log(this.galaxians[0].markedForDeletion)
        for (let ship of this.ships) {
            ship.update(this.deltaTime);
            ship.draw(this.ctx)

        }

        this.createGalaxians()

        requestAnimationFrame(this.gameLoop.bind(this))
    }
}