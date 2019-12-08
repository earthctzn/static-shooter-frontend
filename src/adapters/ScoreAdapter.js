class ScoreAdapter {
  constructor() {
    this.scoreUrl = 'http://localhost:3000/api/v1/scores'
  }

  getScores() {
    return fetch(this.scoreUrl).then(res => res.json())
  }
}