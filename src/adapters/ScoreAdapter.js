class ScoreAdapter {
    constructor() {
        this.scoreUrl = 'https://static-shooter-backend.herokuapp.com/api/v1/scores' 
        // 'https://static-shooter-backend.herokuapp.com/api/v1/scores' 
        // 'http://localhost:3000/api/v1/scores'
        this.loading = false
    }
    async getTopScore() {
        try {
            this.loading = true
            let response = await fetch(`${this.scoreUrl}/top`)
            let data = await response.json()
            if(data.score != undefined){
                this.loading = false
                return data.score 
            }
            
        } catch (error) {
            "Error on Fetch."
        }
    }

    async getTopFive() {
        try {
            this.loading = true
            let response = await fetch(`${this.scoreUrl}/topfive`)
            let data = await response.json()
            if(data != undefined){
                this.loading = false
                return data 
            }
        } catch (error) {
            "Error on Fetch."
        }
    }
}