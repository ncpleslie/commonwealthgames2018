/*
This function needs internet access
This heads to the urls for each sport (See URLs below)
Grabs the relevant data and feeds it into the system. Errors will be shown in console. This is normal and an issue with javascripts async nature
*/
// Fetch URL
// Grab relevant data from webpage. Send data to eventToObject()
// Then adds the data to the system
function fetchPages (url, sport, location) {
    // Set up variables and URLs
  var theResponse
  var doc
  var wholeTable = []

  return fetch("https://immense-citadel-58241.herokuapp.com/"+url) // html as text
        .then((resp) => resp.text())
        .then(function (html) {
            // Initialize the DOM parser
          var parser = new DOMParser()
            // Parse the text
          doc = parser.parseFromString(html, 'text/html')
          wholeTable = doc.querySelectorAll('tr')
        })
        // Add the data to the system
        .then(function () {
          theResponse = eventToObject(wholeTable)
          let aSport = the2018Games.addSport(sport, location)
          for (let i = 1; i < theResponse.length; i++) {
            aSport.addMatch(theResponse[i].Year, theResponse[i].Month, theResponse[i].Day, theResponse[i].Hour, theResponse[i].Minute, theResponse[i].Pool, theResponse[i].TeamA, theResponse[i].TeamB)
          }
        })
        .then(function () {
          addPoolResults(the2018Games)
          addShortNames(the2018Games)
          the2018Games.expandSports()
          console.log(the2018Games)
        })
}

// Forms data (from fetchPages()) into a useable array of objects.
function eventToObject (wholeTable) {
    // var wholeTable = $$('tr', $0)
    // Set up vars
  const APRIL = 3
  var tempObj = [{}]

  for (let i = 1; i < wholeTable.length; i++) {
        // Take date information. Put into array
    var dateArr = []
    var dateStr = wholeTable[i].cells[0].innerText

    dateArr = dateStr.split(/\W+/gm)

        // Take the names of Pool, TeamA, TeamB. Put into array
    var newArr = []
    var newArrBad = []
    var eventStr = wholeTable[i].cells[4].innerText.replace(/\s+/, '')
    newArrBad = eventStr.split('\n')
    for (let aStr of newArrBad) {
      newArr.push(aStr.trim())
    }

        // Pool comes out as a string. Example "Women Pool A". This takes the last character (The Pool Name) and puts into object. Breaks if out of Pool matches
    var poolStr = newArr[1]
    var poolStrLast = poolStr.substr(poolStr.length - 1)

    if (poolStrLast === 'A' || poolStrLast === 'B' || poolStrLast === 'C' || poolStrLast === 'D') {
            // Null
    } else {
      break
    }

        // Define the object parameters
    tempObj[i] = {
      Year: 2018,
      Month: APRIL,
      Day: '',
      Hour: '',
      Minute: '',
      TeamA: '',
      TeamB: '',
      Pool: ''
    }

        // Add Pool to object
    tempObj[i].Pool = poolStrLast

        // Add team A/B to object
    tempObj[i].TeamA = newArr[5].substring(3)
    tempObj[i].TeamB = newArr[11].substring(3)

        // Add date information to the object
    tempObj[i].Day = parseInt(dateArr[2])
    tempObj[i].Hour = parseInt(dateArr[4])
    tempObj[i].Minute = parseInt(dateArr[5])
  }
  return tempObj
}
