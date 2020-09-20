const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    SHOT: 4,
}
// /Users/Caleb/Development/code/projects/shooter/static-shooter-frontend

class Game {
    constructor() {
        this.gameAdapter = new GameAdapter()
        this.scoreAdapter = new ScoreAdapter()
        this.canvas = document.getElementById('gameSpace');
        this.ctx = this.canvas.getContext('2d')
        this.gameWidth = this.canvas.width;
        this.gameHeight = this.canvas.height;
        this.livesManager = new LivesManager(document.querySelector("#ships"), this.ctx)
        this.coinSound = new Sfx('/resources/sfx/Galaga_Coin_Sound_Effect.mp3')
        this.score = 0
        this.bullets = []
        this.galaxians = []
        this.topScores = []
        this.gamestate = GAMESTATE.MENU
        this.createShip()
        this.bindings()
        this.draw(this.ctx)
    }

    bindings() {
        this.shipShoot = new Sfx('/resources/sfx/Galaga_Firing_Sound_Effect.mp3')
        this.introMusic = new Sfx('/resources/sfx/Galaga_Theme_Song.mp3')
        this.kill = new Sfx('/resources/sfx/Galaga_Kill_Enemy_Sound_Effect.mp3')
        this.listener = new InputHandler(this.ship, this)
        this.scoreTitle = document.getElementById('score-title')
        this.scoreTitle.innerText = '1UP'
        this.scoreObj = document.getElementById("score")
        this.scoreObj.innerText = this.score
        this.scoresDiv = document.getElementById('scores')
        this.scoresList = document.getElementById('scores-list')
        this.scoresListTitle = document.getElementById('top-scores')
        this.scoresListTitle.innerText = "LEADER BOARD"
        this.hiScore = document.getElementById("high-score")
        this.hiScoreTitle = document.getElementById("top-score")
        this.hiScoreTitle.innerText = "HIGH  SCORE"
        this.playerForm = document.getElementById('player-form')
        this.playerFormBody = document.getElementById('player-name')
        this.playerForm.addEventListener('submit', this.saveData.bind(this))
        this.lastTime = 0
        this.deltaTime = 0
        this.scoreAdapter.getTopScore().then(highestScore => {
            if(highestScore != undefined){
                this.hiScore.innerText = highestScore  
            }
        })
    }

    start() {
        this.lives = 4
        this.score = 0
        this.gamestate = GAMESTATE.RUNNING;
        this.addGalaxians()
        this.createGalaxians()
        this.gameLoop()
        this.introMusic.play()
    }

    saveData() {
        const playerName = this.playerFormBody.value
        this.gameAdapter.createGame(this.score, playerName)
        this.lives = 4
        this.score = 0
        this.listScores()
        this.gamestate = GAMESTATE.MENU
        this.update(this.deltaTime)
    }

    shipFire(location) {
        const goodBullet = new GoodBullet(location)
        this.bullets.push(goodBullet)
        this.shipShoot.play()
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
        this.ship = new Ship(this.gameWidth, this.gameHeight)
        this.ship.fire = this.shipFire.bind(this)
        this.ship.draw(this.ctx);
    }

    checkCollision(obj1, obj2) {
        const bttmOfBullet = obj1.location.y + obj1.size.y
        const topOfBulllet = obj1.location.y
        const topOfObject = obj2.location.y
        const bottomOfObject = obj2.location.y + obj2.height
        const leftOfObj = obj2.location.x
        const rightOfObj = obj2.location.x + obj2.width
        if (bttmOfBullet <= topOfObject || topOfBulllet >= bottomOfObject) return false
        if (obj1.location.x >= rightOfObj || obj1.location.x + obj1.size.x <= leftOfObj) return false
        this.kill.play()
        return true
    }

    update() {
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
                    this.livesManager.decrementLives()
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
                            this.kill.play()
                        }
                        if (g.constructor.name == "Galaxian2") {
                            this.score += 300
                            this.kill.play()
                        }
                    }
                }
            }
        }
        //Check if any bullet is off the top or bottom of the screen
        for (let bullet of this.bullets) {
            bullet.update()
            bullet.draw(this.ctx)
            if (bullet.location.y < 0 - bullet.height || bullet.location.y > 900 + bullet.height) {
                bullet.markedForDeletion = true
            }
        }
        //Check if any galaxian type is off the top or bottom of the screen
        for (let p of this.galaxians) {
            p.update()
            p.draw(this.ctx)
            if (p.location.y < 0 - p.height || p.location.y > 900 + p.height) {
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

    listScores(){
       this.scoreAdapter.getTopFive().then(topFive => { 
            if( topFive != undefined ){
                for (let scoreObj of topFive) {
                    this.topScores.push(scoreObj.score)
                    let li = document.createElement('li')
                    li.innerText = `${scoreObj.player.name} - ${scoreObj.score}`
                    this.scoresList.appendChild(li)
                    this.scoresDiv.style.display = "block"
                }
            }
        })
    }
    compareScores(){
        this.scoreAdapter.getTopFive().then(topFive => {
            for (let scoreObj of topFive){
                if(this.score.toString() > scoreObj.score){
                    return true
                }else{
                    return false
                }
            }
        })
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

        this.livesManager.draw()

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px arcadeClassic";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("USE 'LEFT'  AND  'RIGHT'  ARROWS  TO  MOVE", this.gameWidth / 2, this.gameHeight / 2 - 80);
            ctx.fillText("PRESS  THE  'SPACEBAR'  TO  FIRE", this.gameWidth / 2, this.gameHeight / 2 - 60);
            ctx.fillText("PRESS   'ESC'   TO   PAUSE  GAME", this.gameWidth / 2, this.gameHeight / 2 - 40);
            ctx.fillText("PRESS   'ENTER'   TO   START", this.gameWidth / 2, this.gameHeight / 2 - 20);
            this.listScores()
        } else {
            this.scoresDiv.style.display = 'none'
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            ctx.font = "30px arcadeClassic";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("PRESS  'ENTER'  TO  PLAY  AGAIN!", this.gameWidth / 2 + 5, this.gameHeight / 2 + 55);
        }

        if (this.gamestate === GAMESTATE.SHOT) {
            this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.fill();
            this.ctx.font = "30px arcadeClassic";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.fillText("YOU  DIED  PRESS  'C'  TO  CONTINUE", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.GAMEOVER && this.score.toString() > this.hiScore.innerText) {
            this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.fill();
            this.ctx.font = "30px arcadeClassic";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.playerForm.style.display = 'inline';
            this.ctx.fillText("CONGRATS  YOU  SET  A  NEW  HIGH SCORE!", this.gameWidth / 2, this.gameHeight / 2);
        }
        if (this.gamestate === GAMESTATE.GAMEOVER && this.score.toString() > this.topScores[4] ){ 
            this.ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            this.ctx.fillStyle = "rgba(0,0,0,1)";
            this.ctx.fill();
            this.ctx.font = "30px arcadeClassic";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.playerForm.style.display = 'inline';
            this.ctx.fillText("CONGRATS  YOU  MADE IT TO THE LEADER BOARD!", this.gameWidth / 2, this.gameHeight / 2);
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