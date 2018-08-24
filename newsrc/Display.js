/*
This class is responsible for elements that are displayed on the screen
*/
class Display { // eslint-disable-line no-unused-vars
    // --------------------------------------------Used in Fetching-----------------------
    // Creates loading icon
    addLoadingIcon() {
        const LOADING_ICON = document.createElement('div')
        LOADING_ICON.setAttribute('id', 'loadingIcon')
        document.body.appendChild(LOADING_ICON)
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
            const ERROR_STRING = 'Unable to load data. Is the CORS-anywhere proxy down?'
            document.getElementById('title').innerHTML = ERROR_STRING
            document.getElementById('loadingIcon').remove()
        }, 3000)
    }

    // --------------------------------------------Used to display on screen----------------------------
    // Adds a dropdown menu
    intializeDropDown() {
        if (document.getElementById('intialSports')) {
            document.getElementById('intialSports').remove()
        }
        const DROPDOWN_MENU = document.createElement('select')
        DROPDOWN_MENU.setAttribute('id', 'intialSports')
        const firstElement = document.createElement('option')
        firstElement.textContent = 'SELECT A SPORT'
        firstElement.value = 'default'
        firstElement.disabled = true
        firstElement.selected = true
        DROPDOWN_MENU.appendChild(firstElement)

        return DROPDOWN_MENU
    }
    // Add options to the dropdown menu
    addToDropDownMenu(allMySports, i) {
        let sportName = allMySports[i].name
        const DROPDOWN_OPTIONS = document.createElement('option')
        DROPDOWN_OPTIONS.textContent = sportName
        DROPDOWN_OPTIONS.value = sportName

        return DROPDOWN_OPTIONS
    }
    // Display Match Data
    displayTable() {
        let sportLocation = 'Commonwealth Games 2018'
        this.removePreviousElement('title')
        let title = this.createHTMLElement('h1', 'title', 'sportTitle', '')
        document.body.appendChild(title)
        
        document.getElementById('title').innerHTML = sportLocation

        document.getElementById('intialSports').onchange = function() {
            sportLocation = the2018Games.findSport(this.value) // eslint-disable-line no-undef
            document.getElementById('title').innerHTML = sportLocation
            sportLocation.displayMatches() 
        }

        this.displayImage()
        this.turnToLink()
    }

    turnToLink () {
        document.getElementById('title').setAttribute('onclick', 'location.reload()')
    }

    displayImage () {
        let title = document.getElementById('title')
        let img = document.createElement("img")
        img.setAttribute('id','commonwealthImg')
        img.setAttribute('onclick','location.reload()')
        img.setAttribute('src','https://gc2018.thecgf.com/themes/custom/commongame/logo.svg')
        title.appendChild(img)
    }

    displayPoolTable() {
        document.getElementById('Pool').onclick = function() {
            let sportLocation = the2018Games.findSport(document.getElementById('intialSports').value) // eslint-disable-line no-undef

            document.getElementById('title').innerHTML += ' - Pools'

            sportLocation.displayPools()
        }
    }
    // Displays the teams results next to them on mouseover
    displayTeamTable() {
        const teamName = document.getElementsByClassName('tooltip')

        // Must iterate due to .getElementsByClassName turns to array
        for (let i = 0; i < teamName.length; i++) {
            teamName[i].onmouseover = function(e) {
                // Get user mouse location
                let x = e.clientX
                let y = e.clientY
                // Find relevant sport
                let sportLocation = the2018Games.findSport(document.getElementById('intialSports').value) // eslint-disable-line no-undef
                // Find relevant team
                let teamLocation = sportLocation.findTeam(this.textContent)
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
        let newTable
        newTable = document.createElement('table')
        newTable.setAttribute('id', idName)
        appendTo.appendChild(newTable)
        return newTable
    }

    addTableHeaders(theTable, ...allHeaders) {
        let counter = 0
        const NEW_TABLE_ROW = document.createElement('tr')
        let newTableHeader
        for (let aHeader of allHeaders) {
            newTableHeader = document.createElement('th')
            newTableHeader.innerHTML = aHeader
            newTableHeader.setAttribute('id', aHeader)
            counter++
            newTableHeader.setAttribute('class', counter)
            NEW_TABLE_ROW.appendChild(newTableHeader)
        }
        return theTable.appendChild(NEW_TABLE_ROW)
    }

    addTableData(theTable, ...allData) {
        const NEW_TABLE_ROW = document.createElement('tr')
        NEW_TABLE_ROW.setAttribute('class', 'sortThis')
        let newTableData
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.innerHTML = data
            NEW_TABLE_ROW.appendChild(newTableData)
        }
        return theTable.appendChild(NEW_TABLE_ROW)
    }

    addTableDataTwoSpan(...allData) {
        let newTableData
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.setAttribute('rowspan', '2')
            newTableData.innerHTML = data
        }
        return newTableData
    }

    addTableDataTopRow(theTable, firstHalf1, firstHalf2, ...allData) {
        const NEW_TABLE_ROW = document.createElement('tr')
        NEW_TABLE_ROW.setAttribute('class', 'sortThis')
        let newTableData
        NEW_TABLE_ROW.appendChild(firstHalf1)
        NEW_TABLE_ROW.appendChild(firstHalf2)
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.innerHTML = data
            newTableData = this.displayTeamInfo(newTableData, data)
            NEW_TABLE_ROW.appendChild(newTableData)
        }
        theTable.appendChild(NEW_TABLE_ROW)
        return theTable
    }

    addTableDataSecondRow(theTable, ...allData) {
        const NEW_TABLE_ROW = document.createElement('tr')
        NEW_TABLE_ROW.setAttribute('class', 'sortThis')
        let newTableData
        for (let data of allData) {
            newTableData = document.createElement('td')
            newTableData.innerHTML = data
            newTableData = this.displayTeamInfo(newTableData, data)
            NEW_TABLE_ROW.appendChild(newTableData)
        }
        theTable.appendChild(NEW_TABLE_ROW)
    }

    createWrapper(appendTo) {
        const WRAPPER_ELEMENT = document.createElement('div')
        WRAPPER_ELEMENT.setAttribute('style', 'overflow-x:auto;')
        WRAPPER_ELEMENT.setAttribute('id', 'overflowDiv')
        WRAPPER_ELEMENT.appendChild(appendTo)
        document.body.appendChild(WRAPPER_ELEMENT)
    }

    removePreviousElement(elementId) {
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).remove()
        }
    }

    createHTMLElement(element, IDName, className, textContent) {
        let temp = document.createElement(element)
        temp.setAttribute('id', IDName)
        temp.setAttribute('class', className)
        temp.textContent = textContent
        return temp
    }

    displayTeamInfo(newTableData) {

        // IN HERE IT CAN CREATE A TABLE, TABLE HEAD, TABLE ROW, TABLE DATA TO DISPLAY THE TEAM RESULTS
        newTableData.setAttribute('class', 'tooltip')
        let spanElement = document.createElement('span')
        newTableData.setAttribute('id', 'expandTeamInfo')
        spanElement.setAttribute('class', 'tooltiptext')
        newTableData.appendChild(spanElement)
        return newTableData
    }
    // Not my code. Source is: https://jsfiddle.net/thrilleratplay/epcybL4v/ Author: thrilleratplay
    tableResizer () {
        let header;
        let startOffset;
    
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