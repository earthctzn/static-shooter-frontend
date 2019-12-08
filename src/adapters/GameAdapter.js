class GameAdapter {
  constructor() {
    this.gameUrl = 'http://localhost:3000/api/v1/games'
  }

  getGames() {
    return fetch(this.gameUrl).then(res => res.json())
  }
}