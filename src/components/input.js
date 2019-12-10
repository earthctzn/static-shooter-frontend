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
    })
  }

}