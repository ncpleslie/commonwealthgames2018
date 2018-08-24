/*
This function needs internet access
This heads to the urls for each sport (See GlobalVariables.js)
Grabs the relevant data and feeds it into the system.
*/
class Webscraper { // eslint-disable-line no-unused-vars

  initializeProgram() {
      for (let aSport of SPORTS_URLS_AND_INFO) {
          this.fetchPages(aSport.URL, aSport.Sport, aSport.Location)
      }
  }

  async fetchPages(url, sport, location) {
      // Set up variables
      let preController = new PreController()
      let controller = new Controller()
      try {
          // Call Fetch to grab webpage
          const RESPONSE = await fetch(PROXY_URL + url) // html as text
          // Convert page to text
          const HTML = await RESPONSE.text()
          // Initialize the DOM parser and convert text to HTML
          const DOC = await this.domParser(HTML)
          // Grab relevant Table data only
          const WHOLE_TABLE = this.grabTableData(DOC)
          // Format WHOLE_TABLE into readable format
          const FORMATTED_OBJECT = await preController.formatTableToObject(WHOLE_TABLE)
          // Add the data to the system
          await controller.iterateDataToSystem(FORMATTED_OBJECT, sport, location)
          // Finishing functions. Add results and expand buttons
          await the2018Games.expandSports()
          await display.removeLoadingIcon()
      } catch (error) {
          // If error, display error message and remove loading icon
          display.requestError()
      }
  }

  domParser(html) {
      // Initialize the DOM parser
      const PARSER = new DOMParser()
      // Parse the text
      let doc = PARSER.parseFromString(html, 'text/html')
      return doc
  }

  grabTableData(doc) {
      // Find 'tr' elements. Add to var
      let wholeTable = doc.querySelectorAll('tr')
      return wholeTable
  }
}
