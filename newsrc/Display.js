/*
This class is responsible for elements that are displayed on the screen
*/
class Display { // eslint-disable-line no-unused-vars
    // --------------------------------------------Used in Fetching-----------------------
    // Creates loading icon
    addLoadingIcon() {
        var loadingIcon = document.createElement('div')
        loadingIcon.setAttribute('id', 'loadingIcon')
        document.body.appendChild(loadingIcon)
    }
    // Destroys loading icon
    removeLoadingIcon() {
        if (document.getElementById('loadingIcon')) {
            document.getElementById('loadingIcon').remove()
        }
    }
    // Displays Error
    requestError() {
        setTimeout(function() {
            var errorString = 'Unable to load data. Is the CORS-anywhere proxy down?'
            document.getElementById('title').innerHTML = errorString
            document.getElementById('loadingIcon').remove()
        }, 3000)
    }

    // --------------------------------------------Used to display on screen----------------------------
    // Adds a dropdown menu
    intializeDropDown() {
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
    addToDropDownMenu(allMySports, i) {
        var sportName = allMySports[i].name
        var elements = document.createElement('option')
        elements.textContent = sportName
        elements.value = sportName

        return elements
    }
    // Display Match Data
    displayTable() {
        var sportLocation = 'Commonwealth Games 2018'
        this.removePreviousElement('title')
        var title = this.createHTMLElement('h1', 'title', 'sportTitle', '')
        document.body.appendChild(title)

        document.getElementById('title').innerHTML = sportLocation
        document.getElementById('intialSports').onchange = function() {
            sportLocation = the2018Games.findSport(this.value) // eslint-disable-line no-undef

            document.getElementById('title').innerHTML = sportLocation

            sportLocation.displayMatches()
        }
    }

    displayPoolTable() {
        document.getElementById('Pool').onclick = function() {
            var sportLocation = the2018Games.findSport(document.getElementById('intialSports').value) // eslint-disable-line no-undef

            document.getElementById('title').innerHTML += ' - Pools'

            sportLocation.displayPools()
        }
    }
    // Displays the teams results next to them on mouseover
    displayTeamTable() {
        var teamName = document.getElementsByClassName('tooltip')

        // Must iterate due to .getElementsByClassName turns to array
        for (let i = 0; i < teamName.length; i++) {
            teamName[i].onmouseover = function(e) {
                // Get user mouse location
                var x = e.clientX
                var y = e.clientY
                // Find relevant sport
                var sportLocation = the2018Games.findSport(document.getElementById('intialSports').value) // eslint-disable-line no-undef
                // Find relevant team
                var teamLocation = sportLocation.findTeam(this.textContent)
                // Check if teamLocation points to a team
                if (teamLocation !== undefined) {
                    // Call function to display team info tables
                    teamLocation.displayTeam(x, y)

                    // Deletes them when you mouse away
                    teamName[i].onmouseout = function() {
                        document.getElementById('overflowDiv').nextSibling.remove()
                    }
                }
            }
        }
    }
    // --------------------------------------------Used to make a table----------------------------
    makeTable(appendTo, idName) {
        var newTable
        newTable = document.createElement('table')
        newTable.setAttribute('id', idName)
        appendTo.appendChild(newTable)
        return newTable
    }

    addTableHeaders(theTable, ...allHeaders) {
        var counter = 0
        var newTableRow = document.createElement('tr')
        var newTableHeader
        for (let aHeader of allHeaders) {
            newTableHeader = document.createElement('th')
            newTableHeader.innerHTML = aHeader
            newTableHeader.setAttribute('id', aHeader)
            counter++
            newTableHeader.setAttribute('class', counter)
            newTableRow.appendChild(newTableHeader)
        }
        return theTable.appendChild(newTableRow)
    }

    addTableData(theTable, ...allData) {
        var newTableRow = document.createElement('tr')
        newTableRow.setAttribute('class', 'sortThis')
        var newTableData
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.innerHTML = data
            newTableRow.appendChild(newTableData)
        }
        return theTable.appendChild(newTableRow)
    }

    addTableDataTwoSpan(...allData) {
        var newTableData
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.setAttribute('rowspan', '2')
            newTableData.innerHTML = data
        }
        return newTableData
    }

    addTableDataTopRow(theTable, firstHalf1, firstHalf2, ...allData) {
        var newTableRow = document.createElement('tr')
        newTableRow.setAttribute('class', 'sortThis')
        var newTableData
        newTableRow.appendChild(firstHalf1)
        newTableRow.appendChild(firstHalf2)
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.innerHTML = data
            newTableData = this.displayTeamInfo(newTableData, data)
            newTableRow.appendChild(newTableData)
        }
        theTable.appendChild(newTableRow)
        return theTable
    }

    addTableDataSecondRow(theTable, ...allData) {
        var newTableRow = document.createElement('tr')
        newTableRow.setAttribute('class', 'sortThis')
        var newTableData
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.innerHTML = data
            newTableData = this.displayTeamInfo(newTableData, data)
            newTableRow.appendChild(newTableData)
        }
        theTable.appendChild(newTableRow)
    }

    createWrapper(appendTo) {
        var wrapperElement = document.createElement('div')
        wrapperElement.setAttribute('style', 'overflow-x:auto;')
        wrapperElement.setAttribute('id', 'overflowDiv')
        wrapperElement.appendChild(appendTo)
        document.body.appendChild(wrapperElement)
    }

    removePreviousElement(elementId) {
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).remove()
        }
    }

    createHTMLElement(element, IDName, className, textContent) {
        var temp = document.createElement(element)
        temp.setAttribute('id', IDName)
        temp.setAttribute('class', className)
        temp.textContent = textContent
        return temp
    }

    displayTeamInfo(newTableData) {

        // IN HERE IT CAN CREATE A TABLE, TABLE HEAD, TABLE ROW, TABLE DATA TO DISPLAY THE TEAM RESULTS
        newTableData.setAttribute('class', 'tooltip')
        var spanElement = document.createElement('span')
        newTableData.setAttribute('id', 'expandTeamInfo')
        spanElement.setAttribute('class', 'tooltiptext')
        newTableData.appendChild(spanElement)
        return newTableData
    }
    // Not my code. Source is: https://jsfiddle.net/thrilleratplay/epcybL4v/ Author: thrilleratplay
    tableResizer () {
        var header;
        var startOffset;
    
        Array.prototype.forEach.call(
          document.querySelectorAll("table th"),
          function (th) {
            th.style.position = 'relative'

            var divElement = document.createElement('div')
            divElement.style.cursor = 'col-resize'
            divElement.innerHTML = "&nbsp;"
            divElement.style.top = 0
            divElement.style.right = 0
            divElement.style.bottom = 0
            divElement.style.width = '5px'
            divElement.style.position = 'absolute'
            
            divElement.addEventListener('mousedown', function (e) {
                header = th
                startOffset = th.offsetWidth - e.pageX
            })
    
            th.appendChild(divElement)
          })
    
        document.addEventListener('mousemove', function (e) {
          if (header) {
            header.style.width = startOffset + e.pageX + 'px'
          }
        })
        document.addEventListener('mouseup', function () {
            header = undefined
        })
    }

    //-------------------------------------USED TO SORT TABLE---------------------------------------------
}