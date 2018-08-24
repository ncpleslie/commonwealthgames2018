class Controller {
    iterateDataToSystem (theResponse, sport, location) {
      const ASPORT = the2018Games.addSport(sport, location)
      for (let i = 1; i < theResponse.length; i++) {
        ASPORT.addMatch(theResponse[i].Year, theResponse[i].Month, theResponse[i].Day, theResponse[i].Hour, theResponse[i].Minute, theResponse[i].Pool, theResponse[i].TeamA, theResponse[i].TeamB)
        ASPORT.addPoolResult(theResponse[i].TeamA, theResponse[i].TeamB, theResponse[i].ScoreA, theResponse[i].ScoreB)
        ASPORT.addShortName(theResponse[i].TeamA, theResponse[i].TeamAShortName)
        ASPORT.addShortName(theResponse[i].TeamB, theResponse[i].TeamBShortName)
        ASPORT.addFlagURL(theResponse[i].TeamA, theResponse[i].TeamAFlagURL)
        ASPORT.addFlagURL(theResponse[i].TeamB, theResponse[i].TeamBFlagURL)
      }
    }
  }
  