class inputHandler {
  constructor() {
    document.addEventListener('keydown', (e) =>  {

      switch(e.keyCode) {
        case 37:
          alert("move right")
          break
        case 39:
          alert("move left")
          break
      }
    })
  }

}