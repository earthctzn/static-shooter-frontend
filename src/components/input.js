class InputHandler {
  constructor(ship) {
    document.addEventListener('keydown', (e) =>  {

      switch(e.keyCode) {
        case 37:
          ship.moveLeft()
          break
        case 39:
          ship.moveRight()
          break
      }
      document.addEventListener('keyup', (e) => {
        switch(e.keyCode) {
          case 37:
            if (ship.speed < 0 ) ship.stop()
            break
          case 39:
            if (ship.speed > 0 ) ship.stop()
            break
        }
      })
      document.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
          case 32:
            ship.fire()
            break
        }
      })
    })
  }

}