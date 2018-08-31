# commonwealthgames2018
Software Eng 1B Assignment 1

Goal: To create a dynamic SPA (Single Page Application) using javascript. This extends the project we completed in Semester 1. 


**Iteration v0.1**


Add basic CSS

Add a drop down menu to show the data


**Iteration v0.2**


Add webscraper to pull data and place into object

Controller.js updated to reflect this change


**Iteration v0.3**


Automated webscraper.js to pull data from webpages (Requires CORS proxy)

Updated Controller.js to reflect this

Webscraper.js now pushes data to the system


**Iteration v0.4**


Improved CSS

Placed match data into a table


**Iteration v0.5**


Added Loading icon and error info if fails to grab data from commonwealth website

Improved css (For loading icon)
Add .catch for .fetch()

Code refactoring and decomposition (Moved code to new classes)
Made code easier to read and more modular

Automated addPoolResults and addShortName. No longer hardcoded


**Iteration v0.6**


Added pop up info for teams

Changed CSS

Added Pool results demo (Click Pool table header)

Trialed usage of resizable tables



**Iteration v0.7**


Add search option
    - tbody added for easy searching


ES6+ syntax upgrades:


- Turn all "var" to let or const

- Turn fetch function into async and await


**Iteration v0.8 IDEAS**


When constructing the object (Taken from the webpage and formatted in Precontroller), I should use object literals (Var name becomes name of the object property). 

Create a stack for a back button? So it will display the previous table when you push back. Stack (Array)


**Alternative CORS**
// Alternative cos-proxys

// https://immense-citadel-58241.herokuapp.com/  --This is my own

// https://cors-anywhere.herokuapp.com/

// https://cryptic-headland-94862.herokuapp.com/

// https://stackoverflow.com/questions/47076743/cors-anywhere-herokuapp-com-not-working

