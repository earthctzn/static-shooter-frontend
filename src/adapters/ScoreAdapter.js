class ScoreAdapter {
    constructor() {
        this.scoreUrl = 'https://static-shooter-backend.herokuapp.com/api/v1/scores'
        // 'https://static-shooter-backend.herokuapp.com/api/v1/scores' 
        // 'http://localhost:3000/api/v1/scores'

        this.loadingMessage = document.getElementById('loading')
        this.scoresDiv = document.getElementById('scores')
        this.loadingLi = document.getElementById('loading-li')
    }
    
    async getTopScore() {
        try {
            this.loadingMessage.style.display = 'block'
            let response = await fetch(`${this.scoreUrl}/top`)
            let data = await response.json()
            if(data.score != undefined){
                this.loadingMessage.style.display = 'none'
                return data.score 
            }
        } catch (error) {
            "Error on Fetch."
        }
    }

    async getTopFive() {
        try {
            this.scoresDiv.style.display = 'block'
            this.loadingLi.style.display = 'block'
            let response = await fetch(`${this.scoreUrl}/topfive`)
            let data = await response.json()
            if(data != undefined){
                this.loadingLi.style.display = 'none'
                return data 
            }
        } catch (error) {
            "Error on Fetch."
        }
    }
}