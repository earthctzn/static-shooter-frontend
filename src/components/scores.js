class Scores {
  constructor() {
    this.scores = []
    this.adapter = new ScoresAdapter()
    this.setEventListeners()
  }
  loadScores() {
    this.adapter.getScores().then(score => console.log(score))
  }
}