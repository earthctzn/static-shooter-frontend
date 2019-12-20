class GameAdapter {
    constructor() {
        this.gameUrl = 'http://localhost:3000/api/v1/games'
    }

    getGames() {
        return fetch(this.gameUrl).then(res => res.json())
    }

    createGame(score, playerName) {
        const game = {
            score: score,
            player_name: playerName
        }
        return fetch(this.gameUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(game)
            })
            .then(res => res.json())
    }
}