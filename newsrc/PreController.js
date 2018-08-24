class PreController { // eslint-disable-line no-unused-vars
  constructor () {
    this.FORMATTED_MATCH_DATA = [{}]
  }

  formatTableToObject (wholeTableFromWebscraper) {
  // Set up vars
    let returningObject

    for (let i = 1; i < wholeTableFromWebscraper.length; i++) {
    // Take date information. Put into array
      let dateArr = this.convertDateData(wholeTableFromWebscraper, i)

      // Take the names of Pool, TeamA, TeamB. Put into array
      let teamAndPoolArr = this.convertTeamData(wholeTableFromWebscraper, i)

      // Add Flags to the object
      let teamAFlag = this.findFlagURL(wholeTableFromWebscraper, i, 'a')
      let teamBFlag = this.findFlagURL(wholeTableFromWebscraper, i, 'b')

      // Pool comes out as a string. Example "Women Pool A". This takes the last character (The Pool Name) and puts into object. Breaks if out of Pool matches
      let poolStrLastChar = this.convertPoolData(teamAndPoolArr)

      if (poolStrLastChar === 'A' || poolStrLastChar === 'B' || poolStrLastChar === 'C' || poolStrLastChar === 'D') {
      // Null
      } else {
        break
      }

      // Turn to correct format to iterate in Controller.js
      returningObject = this.convertToObject(poolStrLastChar, teamAndPoolArr, dateArr, teamAFlag, teamBFlag, i)
    }
    return returningObject
  }

  convertTeamData (wholeTableFromFormatter, i) {
    let returningArr = []
    let tempArr = []
    let eventStr = wholeTableFromFormatter[i].cells[4].innerText.replace(/\s+/, '')
    tempArr = eventStr.split('\n')
    for (let aStr of tempArr) {
      returningArr.push(aStr.trim())
    }
    return returningArr
  }

  convertDateData (wholeTableFromFormatter, i) {
    let dateStr = wholeTableFromFormatter[i].cells[0].innerText
    return dateStr.split(/\W+/gm)
  }

  convertPoolData (newArr) {
    let poolStr = newArr[1]
    let poolStrLast = poolStr.substr(poolStr.length - 1)
    return poolStrLast
  }

  findFlagURL(wholeTableFromFormatter, i, teamName) {
    let teamA = wholeTableFromFormatter[i].cells[4].innerHTML.indexOf("resCOMMON")

    if (teamName == 'a') {
      let teamAFlag = wholeTableFromFormatter[i].cells[4].innerHTML.substr(teamA, 27)
        return teamAFlag
    } else {
      let teamB = wholeTableFromFormatter[i].cells[4].innerHTML.indexOf("resCOMMON", teamA + 5)
      let teamBFlag = wholeTableFromFormatter[i].cells[4].innerHTML.substr(teamB, 27)
        return teamBFlag
    }
}

  
  convertToObject (poolStrLast, newArr, dateArr, teamAFlag, teamBFlag, i) {
    const APRIL = 3
    const FORMATTED_MATCH_DATA = this.FORMATTED_MATCH_DATA
    // Define the object parameters
    FORMATTED_MATCH_DATA[i] = {
      Year: 2018,
      Month: APRIL,
      Day: '',
      Hour: '',
      Minute: '',
      TeamA: '',
      TeamB: '',
      Pool: '',
      ScoreA: '',
      ScoreB: '',
      TeamAShortName: '',
      TeamBShortName: '',
      TeamAFlagURL: '',
      TeamBFlagURL: ''
    }

    // Add Pool to object
    FORMATTED_MATCH_DATA[i].Pool = poolStrLast

    // Add team A/B to object
    FORMATTED_MATCH_DATA[i].TeamA = newArr[5].substring(3)
    FORMATTED_MATCH_DATA[i].TeamB = newArr[11].substring(3)

    // Add date information to the object
    FORMATTED_MATCH_DATA[i].Day = parseInt(dateArr[2])
    FORMATTED_MATCH_DATA[i].Hour = parseInt(dateArr[4])
    FORMATTED_MATCH_DATA[i].Minute = parseInt(dateArr[5])

    // Add match results
    FORMATTED_MATCH_DATA[i].ScoreA = parseInt(newArr[7])
    FORMATTED_MATCH_DATA[i].ScoreB = parseInt(newArr[13])

    // Add short name
    FORMATTED_MATCH_DATA[i].TeamAShortName = newArr[5].substr(0, 3)
    FORMATTED_MATCH_DATA[i].TeamBShortName = newArr[11].substr(0, 3)

    // Add flag URL
    FORMATTED_MATCH_DATA[i].TeamAFlagURL = teamAFlag
    FORMATTED_MATCH_DATA[i].TeamBFlagURL = teamBFlag

    return FORMATTED_MATCH_DATA
  }
}