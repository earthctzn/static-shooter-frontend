class ScoreAdapter {
    constructor() {
        this.scoreUrl = 'https://static-shooter-backend.herokuapp.com/api/v1/scores'
        // 'https://static-shooter-backend.herokuapp.com/api/v1/scores'
        // 
        // 'http://localhost:3000/api/v1/scores'
    }
    async getTopScore() {
        try {
            let response = await fetch(`${this.scoreUrl}/top`)
            let data = await response.json()
            return data.score
        } catch (error) {
            "Error on Fetch."
        }
    }

    async getTopFive() {
        try {
            let response = await fetch(`${this.scoreUrl}/topfive`)
            let data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            "Error on Fetch."
        }
    }
}