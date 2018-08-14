/*
This function needs internet access
This heads to the urls for each sport (See URLs below)
Grabs the relevant data and feeds it into the system. Errors will be shown in console. This is normal and an issue with javascripts async nature
*/
class Webscraper { // eslint-disable-line no-unused-vars
    constructor () {
      this.urlObj = [
        'Netball',
        'Gold Coast Convention and Exhibition Centre',
        'results.gc2018.com/en/netball/event-schedule-women.htm',
        'Men\'s Rugby Sevens',
        'Robina Stadium',
        'results.gc2018.com/en/rugby-sevens/event-schedule-men.htm',
        'Women\'s Rugby Sevens',
        'Robina Stadium',
        'results.gc2018.com/en/rugby-sevens/event-schedule-women.htm'
      ]
    }
  
    addDataFromWebPages () {
      for (let i = 0; i < this.urlObj.length; i += 3) {
        this.fetchPages(this.urlObj[i + 2], this.urlObj[i], this.urlObj[i + 1])
      }
    }
  
      // Fetch URL
      // Grab relevant data from webpage. Send data to eventToObject()
      // Then adds the data to the system
    fetchPages (url, sport, location) {
          // Set up variables
      var doc
      var wholeTable
      var formattedObj
      var poolResults
      let preController = new PreController()
  
      return fetch('https://immense-citadel-58241.herokuapp.com/' + url) // html as text
  
              .then((resp) => resp.text())
              // If error, display error message and remove loading icon
              .catch(error =>
                  display.requestError()
              )
              .then(function (html) {
                  // Initialize the DOM parser
                var parser = new DOMParser()
                  // Parse the text
                doc = parser.parseFromString(html, 'text/html')
                  // Find 'tr' elements. Add to var
                wholeTable = doc.querySelectorAll('tr')
              })
              .then(function () {
                  // Format wholeTable into readable format
                formattedObj = preController.formatTableToObject(wholeTable)
              })
              .then(function () {
                  // Add the data to the system
                let controller = new Controller()
                controller.iterateDataToSystem(formattedObj, sport, location)
              })
  
              // Finishing functions. Add results and expand buttons
              .then(function () {
                the2018Games.expandSports()
                display.removeLoadingIcon()
              })
    }
  }
  