class ScoreAdapter {
    constructor() {
        this.scoreUrl = 'http://localhost:3000/api/v1/scores'
    }

    getScores() {
        return fetch(this.scoreUrl).then(res => res.json())
    }
    async getHighestScore() {
        // return fetch(this.scoreUrl).then(res => res.json()).then(data => data.highscore.high_score).catch(err => console.log(err))
        try {
            let response = await fetch(this.scoreUrl)
            let data = await response.json()
            return data.highscore[0].high_score
        } catch (error) {
            "Error on Fetch."
            // console.log(error)
        }
    }


}