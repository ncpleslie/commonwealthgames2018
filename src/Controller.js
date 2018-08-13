class Controller {
    iterateDataToSystem (theResponse, sport, location) {
      var aSport = the2018Games.addSport(sport, location)
      for (let i = 1; i < theResponse.length; i++) {
        aSport.addMatch(theResponse[i].Year, theResponse[i].Month, theResponse[i].Day, theResponse[i].Hour, theResponse[i].Minute, theResponse[i].Pool, theResponse[i].TeamA, theResponse[i].TeamB)
        aSport.addPoolResult(theResponse[i].TeamA, theResponse[i].TeamB, theResponse[i].ScoreA, theResponse[i].ScoreB)
        aSport.addShortName(theResponse[i].TeamA, theResponse[i].TeamAShortName)
        aSport.addShortName(theResponse[i].TeamB, theResponse[i].TeamBShortName)
      }
    }
  }
  