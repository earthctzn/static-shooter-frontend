const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLVL: 4
}

class Game {
    constructor() {
        // this.adapter = new GameAdapter()
        this.scoreAdapter = new ScoreAdapter()
        this.canvas = document.getElementById('gameSpace');
        this.ctx = this.canvas.getContext('2d')
        this.scoreObj = document.getElementById("score")
        this.hiScore = document.getElementById("high-score")
        this.gameWidth = this.canvas.width;
        this.gameHeight = this.canvas.height;
        this.bullets = []
        this.galaxians = []
        this.score = 0
        this.lives = 4
        this.createShip()
        this.bindings()
        this.addGalaxians()
        this.createGalaxians()
        this.gameLoop()

    }

    bindings() {
        this.listener = new InputHandler(this.ship, this)
        this.lastTime = 0
        this.deltaTime = 0
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
        let count = 6
        for (let i = 0; i < count; i++) {
            const galaxian1 = new Galaxian1(this.gameWidth, this.gameHeight, this.locateShip.bind(this), this.enemyFire.bind(this))
            const galaxian2 = new Galaxian2(this.gameWidth, this.gameHeight, this.locateShip.bind(this), this.enemyFire.bind(this))
            this.galaxians.push(galaxian1, galaxian2)
        }

    }
    createGalaxians() {
        //I need to be able to add a number of galaxians of all types with both images for each.
        for (let g of this.galaxians)
            g.draw(this.ctx)
    }

    locateShip() {
        return this.ship.location
    }
    createShip() {
        for (let i = 0; i < this.lives; i++) {
            this.ship = new Ship(this.gameWidth, this.gameHeight)
        }

        this.ship.fire = this.shipFire.bind(this)
        this.ship.draw(this.ctx);
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
        return true
    }
    update(deltaTime) {
        //check for collisions with all bullet types
        for (let b of this.bullets) {
            b.update(this.deltaTime)
            b.draw(this.ctx)
            if (b.constructor.name === "BadBullet") {
                //check for collision btwn bad bullets and friendly ship
                if (this.checkCollision(b, this.ship)) {
                    this.ship.markedForDeletion = true
                    b.markedForDeletion = true
                    this.lives -= 1
                }

            } else if (b.constructor.name == "GoodBullet") {
                //check for collision btwn good bullets and enemy ships
                for (let g of this.galaxians) {
                    if (this.checkCollision(b, g)) {
                        g.markedForDeletion = true
                        b.markedForDeletion = true
                        if (g.constructor.name == "Galaxian1") {
                            this.score += 100
                        }
                        if (g.constructor.name == "Galaxian2") {
                            this.score += 300
                        }
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
        if (this.galaxians.length === 0) {
            this.addGalaxians()
            this.createGalaxians()
        }
        // console.log(this.galaxians[0].markedForDeletion)
        if (!this.ship.markedForDeletion) {
            this.ship.update(this.deltaTime);
            this.ship.draw(this.ctx)
        }

    }

    gameLoop(timestamp) {
        this.scoreObj.innerText = this.score
        this.scoreAdapter.getHighestScore().then(highestScore => {
            this.hiScore.innerText = highestScore
        })
        this.deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp
        this.galaxians = this.galaxians.filter(p => !p.markedForDeletion)
        this.bullets = this.bullets.filter(obj => !obj.markedForDeletion)
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.update(this.deltaTime)
        requestAnimationFrame(this.gameLoop.bind(this))
    }
}