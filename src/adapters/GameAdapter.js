class GameAdapter {
    constructor() {
        this.gameUrl = 'https://static-shooter-backend.herokuapp.com/api/v1/games'
        // 'http://localhost:3000/api/v1/games'
    }

    async getGames() {
        const res = await fetch(this.gameUrl)
        return await res.json()
    }

    async createGame(score, playerName) {
        const game = {
            score: score,
            player_name: playerName
        }
        const res = await fetch(this.gameUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(game)
        })
        return await res.json()
    }
}