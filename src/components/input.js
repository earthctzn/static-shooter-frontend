class inputHandler {
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
            ship.stop()
            break
          case 39:
            ship.stop()
            break
        }
      })
    })
  }

}