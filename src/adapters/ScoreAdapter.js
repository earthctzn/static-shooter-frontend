class ScoreAdapter {
    constructor() {
        this.scoreUrl = 'https://static-shooter-backend.herokuapp.com/api/v1/scores' 
        // 'https://static-shooter-backend.herokuapp.com/api/v1/scores' 
        // 'http://localhost:3000/api/v1/scores'

        this.loading = document.getElementById('loading')
        this.score = document.getElementById("score")
        this.scores = document.getElementById('scores')
        this.loadingLi = document.getElementById('loading-li')   

    }

    async getTopScore() {
        try {
            this.score.style.display = 'block'
            this.loading.style.display = 'block'
            let response = await fetch(`${this.scoreUrl}/top`)
            let data = await response.json()
            if(data.score != undefined){
                this.loading.style.display = 'none'
                return data.score 
            }
        } catch (error) {
            "Error on Fetch."
        }
    }

    async getTopFive() {
        try {
            this.scores.style.display = 'block'
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