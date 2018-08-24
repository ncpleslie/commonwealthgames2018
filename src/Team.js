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
      this.poolName = ''
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

  displayTeam(x, y) {
        // Make the table
        let teamTable = display.makeTable(document.body, 'team')
        // Display table at current mouse location
        teamTable.style.top = (y - 150) + 'px'
        teamTable.style.left = (x + 20) + 'px'
        // Add table data
      display.addTableHeaders(teamTable, 'Team', 'Draws', "Loses", "Wins", 'Total', 'For', "Against ")
      display.addTableData(teamTable, '<img src=' + this.flagURL + ' width="135" height="90">' + ' ' + this.name, this.matchesDrawn, this.matchesLost, this.matchesWon, this.matchesPlayed, this.scoreFor, this.scoreAgainst)
  }
}