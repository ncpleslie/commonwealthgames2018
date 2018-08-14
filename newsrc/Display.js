/*
This class is responsible for elements that are displayed on the screen
*/
class Display {
    // --------------------------------------------Used in Fetching-----------------------
        // Creates loading icon
      addLoadingIcon () {
        var loadingIcon = document.createElement('div')
        loadingIcon.setAttribute('id', 'loadingIcon')
        document.body.appendChild(loadingIcon)
      }
        // Destroys loading icon
      removeLoadingIcon () {
        document.getElementById('loadingIcon').remove()
      }
        // Displays Error
      requestError () {
        setTimeout(function () {
          var errorString = 'Unable to load data. Is the CORS-anywhere proxy down?'
          document.getElementById('title').innerHTML = errorString
          document.getElementById('loadingIcon').remove()
        }, 3000)
      }
    
    // --------------------------------------------Used to display on screen----------------------------
        // Adds a dropdown menu
      intializeDropDown () {
        if (document.getElementById('intialSports')) {
          document.getElementById('intialSports').remove()
        }
        var dropDown = document.createElement('select')
        dropDown.setAttribute('id', 'intialSports')
        dropDown.setAttribute('selected')
        dropDown.setAttribute('disabled')
        var firstElement = document.createElement('option')
        firstElement.textContent = 'SELECT A SPORT'
        firstElement.value = 'default'
        dropDown.appendChild(firstElement)
    
        return dropDown
      }
        // Add options to the dropdown menu
      addToDropDownMenu (allMySports, i) {
        var sportName = allMySports[i].name
        var elements = document.createElement('option')
        elements.textContent = sportName
        elements.value = sportName
    
        return elements
      }
        // Display Match Data
      displayTable () {
        var sportLocation = 'Commonwealth Games 2018'
    
        document.createElement('title')
        document.getElementById('title').innerHTML = sportLocation
        document.getElementById('intialSports').onchange = function () {
          sportLocation = the2018Games.findSport(this.value)
    
          document.getElementById('title').innerHTML = sportLocation
    
          sportLocation.displayMatches()
        }
      }
    }
    
