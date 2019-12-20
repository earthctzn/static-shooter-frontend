const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    SHOT: 4,
}

class Game {
    constructor() {
        this.gameAdapter = new GameAdapter()
        this.scoreAdapter = new ScoreAdapter()
        this.canvas = document.getElementById('gameSpace');
        this.ctx = this.canvas.getContext('2d')
        this.gameWidth = this.canvas.width;
        this.gameHeight = this.canvas.height;
        this.bullets = []
        this.galaxians = []
        this.score = 0
        this.lives = 4
        this.gamestate = GAMESTATE.MENU
        this.createShip()
        this.bindings()
        this.draw(this.ctx)

    }

    bindings() {
        this.listener = new InputHandler(this.ship, this)
        this.scoreObj = document.getElementById("score")
        this.hiScore = document.getElementById("high-score")
        this.hiScoreTitle = document.getElementById("top-score")
        this.playerForm = document.getElementById('player-form')
        this.playerFormBody = document.getElementById('player-name')
        this.playerForm.addEventListener('submit', this.saveData.bind(this))
        this.lastTime = 0
        this.deltaTime = 0
        this.scoreAdapter.getTopScore().then(highestScore => {
            this.hiScore.innerText = highestScore
            this.hiScoreTitle.innerText = "high score"
        })
    }

    saveData(e) {
        e.preventDefault()
        const playerName = this.playerFormBody.value
        this.gameAdapter.createGame(this.score, playerName)
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
        for (let g of this.galaxians)
            g.draw(this.ctx)
    }

    locateShip() {
        return this.ship.location
    }
    createShip() {
        // let lives = this.lives
        // for (let i = 0; i < lives; i++) {
        this.ship = new Ship(this.gameWidth, this.gameHeight)
            // I have to render 3 of the lives into the lives div 
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

    start() {
        this.gamestate = GAMESTATE.RUNNING;
        this.addGalaxians()
        this.createGalaxians()
        this.gameLoop()

    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER ||
            this.gamestate === GAMESTATE.SHOT
        )
            return;
        //check for collisions with all bullet types
        for (let b of this.bullets) {
            b.update(this.deltaTime)
            b.draw(this.ctx)
            if (b.constructor.name === "BadBullet") {
                //check for collision btwn bad bullets and friendly ship
                if (this.checkCollision(b, this.ship) && !this.ship.markedForDeletion) {
                    this.ship.markedForDeletion = true
                    b.markedForDeletion = true
                    this.lives -= 1
                    this.gamestate = GAMESTATE.SHOT
                    if (this.gamestate === GAMESTATE.SHOT) {
                        for (let g of this.galaxians) {
                            g.markedForDeletion = true
                        }
                        for (let b of this.bullets) {
                            b.markedForDeletion = true
                        }
                    }
                    this.createShip()
                    new InputHandler(this.ship)
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
            if (p.location.y < 0 - p.height) {
                // p.markedForDeletion = true
                p.reset(this.gameWidth, this.gameHeight)
            }
            if (p.location.y > 800 + p.height) {
                // p.markedForDeletion = true
                p.reset(this.gameWidth, this.gameHeight)
            }
        }

        if (this.galaxians.length === 0) {
            this.addGalaxians()
            this.createGalaxians()
        }

        if (!this.ship.markedForDeletion) {
            this.ship.update(this.deltaTime);
            this.ship.draw(this.ctx)
        }
    }

    draw(ctx) {
        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "30px arcadeClassic";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px arcadeClassic";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
                "press enter to start",
                this.gameWidth / 2,
                this.gameHeight / 2
            );
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px arcadeClassic";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("game over", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.SHOT) {
            this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.fill();
            this.ctx.font = "30px arcadeClassic";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText("You died press c to continue", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER && this.score.toString() > this.hiScore.innerText) {
            this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.fill();
            this.ctx.font = "30px arcadeClassic";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.playerForm.style.display = 'inline';
            this.ctx.fillText("Congratulations, you set a new High Score!", this.gameWidth / 2, this.gameHeight / 2);
        }



    }
    toggleContinue() {
        if (this.gamestate == GAMESTATE.SHOT) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.SHOT
        }
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

    gameLoop(timestamp) {
        this.scoreObj.innerText = this.score
        this.deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp
        this.galaxians = this.galaxians.filter(p => !p.markedForDeletion)
        this.bullets = this.bullets.filter(obj => !obj.markedForDeletion)
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.update(this.deltaTime)
        this.draw(this.ctx)
        requestAnimationFrame(this.gameLoop.bind(this))
    }
}