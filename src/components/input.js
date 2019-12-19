class InputHandler {
    constructor(ship, game) {
        document.addEventListener('keydown', (e) => {
            console.log(e.keyCode)
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
                    game.togglePause()
                    break
                case 13:
                    game.start()
                    break
                case 67:
                    if (game.gamestate == GAMESTATE.SHOT) {
                        game.toggleContinue()
                    }
                    break
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