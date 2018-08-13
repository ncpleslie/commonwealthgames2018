class PreController {
    constructor() {
        this.tempObj = [{}]
    }

    formatTableToObject(wholeTable) {
        // Set up vars
        var returningObject

        for (let i = 1; i < wholeTable.length; i++) {
            // Take date information. Put into array
            var dateArr = this.convertDateData(wholeTable, i)

            // Take the names of Pool, TeamA, TeamB. Put into array
            var newArr = this.convertTeamData(wholeTable, i)

            // Pool comes out as a string. Example "Women Pool A". This takes the last character (The Pool Name) and puts into object. Breaks if out of Pool matches
            var poolStrLast = this.convertPoolData(newArr)

            if (poolStrLast === 'A' || poolStrLast === 'B' || poolStrLast === 'C' || poolStrLast === 'D') {
                // Null
            } else {
                break
            }

            // Turn to correct format to iterate in Controller.js
            returningObject = this.convertToObject(poolStrLast, newArr, dateArr, i)
        }
        return returningObject
    }

    convertTeamData(wholeTable, i) {
        var newArr = []
        var newArrBad = []
        var eventStr = wholeTable[i].cells[4].innerText.replace(/\s+/, '')
        newArrBad = eventStr.split('\n')
        for (let aStr of newArrBad) {
            newArr.push(aStr.trim())
        }
        return newArr
    }

    convertDateData(wholeTable, i) {
        var dateStr = wholeTable[i].cells[0].innerText
        return dateStr.split(/\W+/gm)
    }

    convertPoolData(newArr) {
        var poolStr = newArr[1]
        var poolStrLast = poolStr.substr(poolStr.length - 1)
        return poolStrLast
    }

    convertToObject(poolStrLast, newArr, dateArr, i) {
        const APRIL = 3
        var tempObj = this.tempObj
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

        return tempObj
    }

}