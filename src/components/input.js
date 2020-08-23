class InputHandler {
    constructor(ship, game) {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                // left keyboard arrow
                case 37:
                    ship.moveLeft()
                    break
                // right keyboard arrow
                case 39:
                    ship.moveRight()
                    break
                // space bar
                case 32:
                    if (!ship.markedForDeletion) {
                        ship.fire({...ship.location })
                    }
                    break
                // esc button
                case 27:
                    if (game && (game.gamestate === GAMESTATE.RUNNING ||
                            game.gamestate === GAMESTATE.PAUSED
                        )) {
                        game.togglePause()
                    } else {
                        break
                    }
                // enter or return button
                case 13:
                    if (game && (game.gamestate === GAMESTATE.MENU 
                        )) {
                        game.coinSound.play()
                        game.start()
                    } else if(game && (game.gamestate === GAMESTATE.GAMEOVER)){
                        let newGame = new Game
                        newGame.coinSound.play()
                        newGame.start()

                    }
                    break
                // "c" on the keyboard
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