window.onload = main;

// Main function that sets up the initial state of the program
function main() {
    // Get references to html elements
    let shuffle = document.getElementById("shuffle");
    let mainSlider = document.getElementById("main-slider");
    let timeSlider = document.getElementById("ms-between-sorts");
    let output = document.getElementById("output");
    let bogoHtml = document.getElementById("bogo");
    let bubbleHtml = document.getElementById("bubble");
    let checkSort = document.getElementById("checkSort");
    let iterationCounter = document.getElementById("iteration-counter");
    let colorPickerStart = document.getElementById("color-picker-start");
    let colorPickerEnd = document.getElementById("color-picker-stop");

    // Store the start and end colors in RGB
    let startHex = hexToRgb(colorPickerStart.value);
    let endHex = hexToRgb(colorPickerEnd.value);

    // Create an empty array for the columns
    const columns = [];

    // Set the output value to match the main slider
    output.innerHTML = mainSlider.value;


    // Generate the initial columns
    generateColumns(mainSlider.value);

    // Adds event handlers for html elements
    checkSort.onclick = function () {
    };
    shuffle.onclick = function () {
        shuffleColumns();
    };
    bogoHtml.onclick = function () {
        bogo();
    };
    bubbleHtml.onclick = function () {
        bubble();
    };
    colorPickerStart.oninput = function () {
        startHex = hexToRgb(colorPickerStart.value);
        generateColumns(mainSlider.value);
    };

    colorPickerEnd.oninput = function () {
        endHex = hexToRgb(colorPickerEnd.value);
        generateColumns(mainSlider.value);
    };
    mainSlider.oninput = function () {
        output.innerHTML = this.value;
        generateColumns(mainSlider.value);
    };

    // Function to generate the columns
    function generateColumns(size) {
        // Clears the existing columns
        columns.splice(0, columns.length);

        // Loop to add new columns to the columns array
        for (let i = 0; i < size; i++) {
            // Create a new column
            let column = document.createElement("div");
            // Add "column" class to the column
            column.classList.add("column");
            // Setting the index number of the column
            column.dataset.indexNumber = i.toString();

            // Calculate the percentage for color calculation
            let percentage = i / size;
            if (percentage === 0) {
                percentage = 0.01;
            }

            // Calculate the RGB color value
            let red = Math.round(startHex[0] + ((endHex[0] - startHex[0]) * percentage));
            let green = Math.round(startHex[1] + ((endHex[1] - startHex[1]) * percentage));
            let blue = Math.round(startHex[2] + ((endHex[2] - startHex[2]) * percentage));

            // Setting the background color of the column
            column.style.backgroundColor = "#" + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + blue.toString(16).padStart(2, "0");
            // Setting the width of the column as a percentage of the sorting area width
            column.style.width = 100 / size + "%";
            // Setting the height of the column as a percentage of the sorting area height
            column.style.height = (i + 1) * (100 / size) + "%";

            // Adding the column to the array of columns
            columns.push(column);
        }
        // Visualizes the columns
        visualizeColumns();
    }

    //Function to clear all columns
    function clearColumns() {
        // Gets all columns from the sorting area
        const columns = document.getElementsByClassName("column");
        // While there are still columns left, remove them
        while (columns.length > 0) {
            columns[0].parentNode.removeChild(columns[0]);
        }
    }

    // Function to visualize the columns in the "sorting_area" HTML element
    function visualizeColumns() {
        // Get the sorting area HTML element
        let sortingArea = document.getElementById("sorting_area");

        // Clears previous columns from the sorting area
        clearColumns();

        // Loop through the columns array
        for (let i = 0; i < columns.length; i++) {
            // Append each column to the "sorting_area" html div
            sortingArea.append(columns[i]);
        }
    }

// Function that randomly rearranges the columns in the array "columns"
    function shuffleColumns() {

        // Create a copy of the original columns array
        const tempColumns = [...columns];

        // Clear the original columns array
        columns.splice(0, columns.length);

        // Get the length of the array
        const columnLength = tempColumns.length;

        // Loop through the tempColumns array and select a random column to place back into the column array
        for (let i = 0; i < columnLength; i++) {
            let randInt = Math.floor(Math.random() * tempColumns.length);
            columns.push(tempColumns[randInt]);
            tempColumns.splice(randInt, 1);
        }
        // Visualizes the column
        visualizeColumns();
    }

    // Function that returns true if the columns are sorted and false otherwise
    function checkIfSorted() {
        // Create a flag to indicate that the columns are sorted
        let sorted = true;
        // Loop through the columns array and compare adjacent elements
        for (let i = 0; i < columns.length - 1; i++) {
            // Get the value of the next column
            let nextColumn = parseInt(columns[i + 1].dataset.indexNumber);
            // Check if the current column is greater than or equal to the next column
            if (columns[i].dataset.indexNumber >= nextColumn) {
                // If so, set the sorted flag to false
                sorted = false;
                break;
            }
        }
        // Return the sorted flag.
        return sorted;
    }

    // Function to convert a string of hexadecimal characters into an array with r,g,b values
    function hexToRgb(hex) {
        // Checks if the first character is "#"
        if (hex[0] === "#") {
            // If true, it removes the character
            hex = hex.substring(1);
        }

        //Creates the r,g,b values from the string
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        //Returns the array
        return [r, g, b];
    }

    // Function that implements the bogo sort algorithm
    async function bogo() {
        // Creates a counter to keep track of the number of iterations
        let counter = 0;
        // Loop until the columns array is sorted
        while (!checkIfSorted()) {
            // Update the iteration counter in the html
            iterationCounter.innerHTML = '' + counter;
            // Shuffles the columns
            shuffleColumns();
            // Wait for the specified time before continuing
            await new Promise(r => setTimeout(r, timeSlider.value));
            // Add one to the counter
            counter++;
        }
    }

    // Function that implements the bubble sort algorithm
    async function bubble() {
        // Defines a variable as the length of the column array
        const columnLength = columns.length;
        // Creates a counter to keep track of the number of iterations
        let counter = 0;
        // Loop until the columns array is sorted
        while (!checkIfSorted()) {
            // Update the iteration counter in the html
            iterationCounter.innerHTML = '' + counter;
            // For loop that compares two adjacent columns and sorts them
            for (let i = 0; i < columnLength - 1; i++) {
                // Variable that gets the index number of the adjacent column
                let nextColumn = parseInt(columns[i + 1].dataset.indexNumber);
                //Checks if the selected columns index number is larger than the adjacent one, and then switches them
                if (columns[i].dataset.indexNumber >= nextColumn) {
                    //Bubble sorting magic
                    let temp = columns[i + 1];
                    columns[i + 1] = columns[i];
                    columns[i] = temp;
                }
            }
            // Wait for the specified time before visualizing the columns
            await new Promise(r => setTimeout(r, timeSlider.value));
            visualizeColumns();
            // Increases the counter by one
            counter++;
        }
    }
}