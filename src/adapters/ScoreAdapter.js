class ScoreAdapter {
    constructor() {
        this.scoreUrl = 'http://localhost:3000/api/v1/scores'
    }

    getScores() {
        return fetch(this.scoreUrl).then(res => res.json())
    }
    async getTopScore() {
        try {
            let response = await fetch(this.scoreUrl)
            let data = await response.json()
            return data.topscore[0].high_score
        } catch (error) {
            "Error on Fetch."
        }
    }

    async getTopTen() {
        try {
            let response = await fetch(this.scoreUrl)
            let data = await response.json()
            console.log(data.topten)
                // return data.topten.topten
        } catch (error) {
            "Error on Fetch."
        }
    }
}