class GameAdapter {
  constructor() {
    this.gameUrl = 'http://localhost:3000/api/v1/games'
  }

  getGames() {
    return fetch(this.gameUrl).then(res => res.json())
  }

  createGame(lives=4, score=0){
    const startinglives = {
      lives: lives
    }
    const startingScore = {
      score: score
    }
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },      
      lives: JSON.stringify({startinglives}),
      score: JSON.stringify({startingScore})
    })
    .then(res => res.json())
  }
}