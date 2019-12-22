class InputHandler {
    constructor(ship, game) {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37:
                    ship.moveLeft()
                    break
                case 39:
                    ship.moveRight()
                    break
                case 32:
                    if (!ship.markedForDeletion) {
                        ship.fire({...ship.location })
                    }
                    break
                case 27:
                    if (game && game.gamestate === GAMESTATE.RUNNING) {
                        game.togglePause()
                    } else {
                        break
                    }
                case 13:
                    if (game && (game.gamestate === GAMESTATE.MENU ||
                            game.gamestate === GAMESTATE.GAMEOVER
                        )) {
                        game.coinSound.play()
                        game.start()
                    } else {
                        break
                    }
                case 67:
                    if (game && game.gamestate === GAMESTATE.SHOT) {
                        game.toggleContinue()
                    } else {
                        break
                    }

            }
            document.addEventListener('keyup', (e) => {
                switch (e.keyCode) {
                    case 37:
                        if (ship.speed < 0) ship.stop()
                        break
                    case 39:
                        if (ship.speed > 0) ship.stop()
                        break
                }
            })
        })
    }

}