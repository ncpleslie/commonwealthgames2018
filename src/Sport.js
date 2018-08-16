class Sport {
  constructor (newName, newVenue) {
    this.name = newName
    this.venue = newVenue
    this.allMyPools = []
    this.allMyTeams = []
    this.allMyMatches = []
  }
  toString () {
    return `${this.name} at ${this.venue}`
  }
  findTeam (targetName) {
    return this.allMyTeams.find(aTeam => aTeam.name === targetName)
  }
  addTeam (newName) {
    let aTeam = this.findTeam(newName)
    if (!aTeam) {
      aTeam = new Team(newName)
      this.allMyTeams.push(aTeam)
    }
    return aTeam
  }
  sortTeams () {
    this.allMyTeams.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      } // a must be equal to b
      return 0
    })
  }

  findPool (targetName) {
    return this.allMyPools.find(aPool => aPool.name === targetName)
  }
  sortPools () {
    this.allMyPools.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      } // a must be equal to b
      return 0
    })
  }
  addPool (newName) {
    let name = newName.trim()
    let aPool = this.findPool(name)
    if (!aPool) {
      aPool = new Pool(name)
      this.allMyPools.push(aPool)
    }
    return aPool
  }
  addMatch (newYear, newMonth, newDay, newHour, newMinute, newPoolName, newTeamNameA, newTeamNameB) {
    let when = new Date(newYear, newMonth, newDay, newHour, newMinute)
    let thePool = this.addPool(newPoolName)
    let teamA = this.addTeam(newTeamNameA)
    let teamB = this.addTeam(newTeamNameB)
    thePool.addTeam(teamA)
    thePool.addTeam(teamB)
    let newMatch = new Match(when, thePool, teamA, teamB)
    this.allMyMatches.push(newMatch)
  }
  sortMatches () {
    this.allMyMatches.sort((a, b) => {
      if (a.when < b.when) {
        return -1
      }
      if (a.when > b.when) {
        return 1
      } // same time - now sort by pool
      return 0
    })
  }
  getTeams () {
    this.sortTeams()
    let result = '*' + this.name + View.NEWLINE()
    for (let aTeam of this.allMyTeams) {
      result += aTeam + View.NEWLINE()
    }
    result += View.NEWLINE()
    return result
  }
  getPools () {
    this.sortPools()
    let result = '*' + this.name + View.NEWLINE()
    for (let aPool of this.allMyPools) {
      result += aPool.getTeams() + View.NEWLINE()
    }
    return result
  }

  sortMatchesByPool () {
    this.allMyMatches.sort((a, b) => {
      if (a.myPool.name < b.myPool.name) {
        return -1
      }
      if (a.myPool.name > b.myPool.name) {
        return 1
      } else {
        return 0
      }
    })
  }

  getMatchResults () {
    this.sortMatchesByPool()
    let result = '*' + this.name + View.NEWLINE()
    for (let aMatch of this.allMyMatches) {
      result += aMatch + View.NEWLINE()
    }
    return result
  }

  getNZMatches () {
    this.sortMatchesByPool()
    let result = '*' + this.name + View.NEWLINE()
    for (let aMatch of this.allMyMatches) {
      if (aMatch.hasTeam('New Zealand')) {
        result += aMatch + View.NEWLINE()
      }
    }
    return result
  }
  // --------------------------------------------------------------------------
  findMatch (winner, looser) {
    return this.allMyMatches.find(aMatch => ((aMatch.myTeamA === winner && aMatch.myTeamB === looser) || (aMatch.myTeamB === winner && aMatch.myTeamA === looser)))
  }

  addPoolResult (winnerName, looserName, newWinnwerScore, newLooserScore) {
    let winner = this.findTeam(winnerName)
    let looser = this.findTeam(looserName)
    let theMatch = this.findMatch(winner, looser)
    let scoreA = newWinnwerScore
    let scoreB = newLooserScore
    if (theMatch.myTeamA.name !== winner.name) {
      scoreA = newLooserScore
      scoreB = newWinnwerScore
    }
    theMatch.addResult(scoreA, scoreB)
  }

  addShortName (fullTeamName, shortTeamName) {
    let theTeam = this.findTeam(fullTeamName)
    theTeam.shortName = shortTeamName
  }

  getResults () {
    let result = `Results for ${this.name}` + View.NEWLINE()
    this.sortPools()
    for (let aMatch of this.allMyMatches) {
      let thePool = aMatch.myPool
      thePool.addMatch(aMatch)
    }

    for (let aPool of this.allMyPools) {
      result += aPool + View.NEWLINE()
      result += aPool.getResults()
    }
    return result
  }

  sortTeams () {
    this.allMyTeams.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      } // a must be equal to b
      return 0
    })
  }

  getTeamResults () {
    this.sortTeams()
    let result = '*' + this.name + View.NEWLINE()
    for (let aTeam of this.allMyTeams) {
      result += View.padRight(aTeam, 20) + aTeam.getResults() + View.NEWLINE()
    }
    result += View.NEWLINE()
    return result
  }


  //----------------------------------------------SEMESTER 2 CODE HERE-------------------------------------------------

  addFlagURL (teamName, teamFlag) {
    let theTeam = this.findTeam(teamName)
    theTeam.flagURL = 'https://results.gc2018.com/' + teamFlag
  }

  // Displays match data as a table
  displayMatches () {
    display.removePreviousElement('overflowDiv')
    var matchTable = display.makeTable(document.body, 'match')
    display.createWrapper(matchTable)
    display.addTableHeaders(matchTable, 'Time', 'Pool', null, 'Event', 'Results')
    for (let aMatch of this.allMyMatches) {
      var firstHalf1 = display.addTableDataTwoSpan(aMatch.when)
      var firstHalf2 = display.addTableDataTwoSpan(aMatch.myPool)
      var firstHalf3 = display.addTableDataTopRow(matchTable, firstHalf1, firstHalf2, '<img src=' + aMatch.myTeamA.flagURL + ' width="26" height="19">', aMatch.myTeamA, aMatch.scoreA)
      display.addTableDataSecondRow(firstHalf3, '<img src=' + aMatch.myTeamB.flagURL + ' width="26" height="19">', aMatch.myTeamB, aMatch.scoreB)
    }
    display.displayPoolTable()
    display.sortTableListener()
  }

  displayPools () {
    display.removePreviousElement('overflowDiv')
    var poolTable = display.makeTable(document.body, 'pool')
    display.createWrapper(poolTable)
      display.addTableHeaders(poolTable, 'Pool', 'Team', 'Draws', "Loses", "Wins", 'Total', 'For', "Against ")
      for (let aPool of this.allMyPools) {
        for (let aPool2 of aPool.allMyTeams){
          display.addTableData(poolTable, aPool, '<img src=' + aPool2.flagURL + ' width="26" height="19">' + ' ' + aPool2, aPool2.matchesDrawn, aPool2.matchesLost, aPool2.matchesWon, aPool2.matchesPlayed, aPool2.scoreFor, aPool2.scoreAgainst)
        }
      }
      display.sortTableListener()
  }


}
