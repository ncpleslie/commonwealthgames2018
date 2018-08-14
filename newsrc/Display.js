/*
This class is responsible for elements that are displayed on the screen
*/
class Display { // eslint-disable-line no-unused-vars
  // --------------------------------------------Used in Fetching-----------------------
  // Creates loading icon
  addLoadingIcon () {
    var loadingIcon = document.createElement('div')
    loadingIcon.setAttribute('id', 'loadingIcon')
    document.body.appendChild(loadingIcon)
  }
  // Destroys loading icon
  removeLoadingIcon () {
    if (document.getElementById('loadingIcon')) {
      document.getElementById('loadingIcon').remove()
    }
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
    var firstElement = document.createElement('option')
    firstElement.textContent = 'SELECT A SPORT'
    firstElement.value = 'default'
    firstElement.disabled = true
    firstElement.selected = true
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
      sportLocation = the2018Games.findSport(this.value) // eslint-disable-line no-undef

      document.getElementById('title').innerHTML = sportLocation

      sportLocation.displayMatches()
    }
  }
  // --------------------------------------------Used to make a table----------------------------
  makeTable (appendTo, idName) {
    var newTable
    newTable = document.createElement('table')
    newTable.setAttribute('id', idName)
    appendTo.appendChild(newTable)
    return newTable
  }

  addTableHeaders (theTable, ...allHeaders) {
    var newTableRow = document.createElement('tr')
    var newTableHeader
    for (let aHeader of allHeaders) {
      newTableHeader = document.createElement('th')
      newTableHeader.innerHTML = aHeader
      newTableRow.appendChild(newTableHeader)
    }
    theTable.appendChild(newTableRow)
  }

  addTableData (theTable, ...allData) {
    var newTableRow = document.createElement('tr')
    var newTableData
    for (let data of allData) {
      newTableData = document.createElement('td')
      newTableData.innerHTML = data
      newTableRow.appendChild(newTableData)
    }
    theTable.appendChild(newTableRow)
  }

  createWrapper (appendTo) {
    var wrapperElement = document.createElement('div')
    wrapperElement.setAttribute('style', 'overflow-x:auto;')
    wrapperElement.setAttribute('id', 'overflowDiv')
    wrapperElement.appendChild(appendTo)
    document.body.appendChild(wrapperElement)
  }

  removePreviousTable (tableId) {
    if (document.getElementById(tableId)) {
      document.getElementById(tableId).remove()
    }
  }
}
