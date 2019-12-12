class Galaxian {
  constructor(gameWidth, gameHeight) {
    // this.missile = document.getElementById('badMissile')
    this.gameWidth = gameWidth
    // this.width = this.img1.width
    // this.height = this.img1.height
    this.velocity = {
      x: 10,
      y: 10
    }
    this.maxSpeed = 7
    this.speed = 0
    // this.position = {
    //   x: gameWidth/ 2 - this.width / 2,
    //   y: gameHeight - this.height - 30
    // }
  }
//   setFlightPattern(){
//     setTimeout(() =>{

//         this.velocity = {
//             x: 1000, y: 10
//         }
//         setTimeout(() => {
//             this.velocity = {
//                 x: 0, y: 90
//             }
//             setTimeout(() => {
//                 this.velocity = {
//                     x: -100, y: -100
//                 }
//                 setTimeout(() => {
//                     this.velocity = {
//                         x: 100, y: -100
//                     }
//                     setTimeout(() => {
//                         this.velocity = {
//                             x: 100, y: 100
//                         }
//                         setTimeout(() => {
//                             this.velocity = {
//                                 x: -100, y: 100
//                             }
//                             this.setFlightPattern()
//                         }, 200)
//                     }, 200)
//                 }, 200)
//             }, 200)
//         }, 1000)

//     }, 1000)
   
    
// }
  // flapWings() {

  // }
 
  draw(ctx) {
    ctx.drawImage( this.img1, this.position.x, this.position.y, this.width, this.height)
  }
}