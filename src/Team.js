class Team {
  constructor(newName) {
      this.name = newName
      this.shortName = ''
      this.matchesPlayed = 0
      this.matchesWon = 0
      this.matchesLost = 0
      this.matchesDrawn = 0
      this.scoreFor = 0
      this.scoreAgainst = 0
      this.poolRank = 0
  }
  incWin() {
      this.matchesWon += 1
  }
  incLoss() {
      this.matchesLost += 1
  }
  incPlayed() {
      this.matchesPlayed += 1
  }
  incScoreFor(newScoreFor) {
      this.scoreFor += newScoreFor
  }
  incScoreAgainst(newScoreAgainst) {
      this.scoreAgainst += newScoreAgainst
  }
  toString() {
      return this.name
  }
  getResults() {
      let result = View.SPACES(4)
      result += View.padRight(this.matchesPlayed)
      result += View.padRight(this.matchesWon)
      result += View.padRight(this.matchesLost)
      result += View.padRight(this.matchesDrawn)
      result += View.padRight(this.scoreFor)
      result += View.padRight(this.scoreAgainst)
      return result
  }
  shortNameString() {
      return this.shortName
  }

  displayTeam() {
      //display.removePreviousElement('overflowDiv')
      //document.getElementById('title').innerHTML += ' - ' + this.name
      var matchTable = display.makeTable(document.body, 'team')
      display.createWrapper(matchTable)
      display.addTableHeaders(matchTable, 'Team', 'Draws', "Loses", "Wins", 'Total', 'For', "Against ")
      display.addTableData(matchTable, '<img src=' + this.flagURL + ' width="104" height="76">' + ' ' + this.name, this.matchesDrawn, this.matchesLost, this.matchesWon, this.matchesPlayed, this.scoreFor, this.scoreAgainst)
  }
}