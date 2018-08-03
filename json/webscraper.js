/*
Turn Webpage into Object
*/

//Netball
function eventToObject(){
            
    var wholeTable = $$('tr', $0)
    const APRIL = 3
    var tempObj = []

    for (i=1; i<wholeTable.length; i++){
    


    //Take date information. Put into array
    var dateArr = []
    var dateStr = wholeTable[i].cells[0].innerText
    dateArr = dateStr.split(/\W+/gm)
    
    //Take the names of Pool, TeamA, TeamB. Put into array
    var newArr = []
    var eventStr = wholeTable[i].cells[4].innerText
    newArr = eventStr.split("\n")

    //Pool comes out as a string. Example "Women Pool A". This takes the last character (The Pool Name) and puts into object. Breaks if out of Pool matches
    var poolStr = newArr[0]
    var poolStrLast = poolStr.substr(poolStr.length - 1)
    if (poolStrLast == "A"||poolStrLast == "B"||poolStrLast == "C"||poolStrLast == "D"){
    //Null
    } else {
        break
    }

    //Define the object parameters
    tempObj[i]={Year: 2018, Month: APRIL, Day:"", Hour:"", Minute:"", TeamA:"", TeamB:"", Pool:""}

    //Add Pool to object
    tempObj[i].Pool=poolStrLast

    //Add team A/B to object
    tempObj[i].TeamA=newArr[2]
    tempObj[i].TeamB=newArr[5]

    //Add date information to the object
    tempObj[i].Day=parseInt(dateArr[1])
    tempObj[i].Hour=parseInt(dateArr[3])
    tempObj[i].Minute=parseInt(dateArr[4])
    }
}