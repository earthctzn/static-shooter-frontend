class Galaxian {
    constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.velocity = {
                x: 10,
                y: 10
            }
            this.maxSpeed = 7
            this.speed = 0
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
        ctx.drawImage(this.img1, this.position.x, this.position.y, this.width, this.height)
    }
}