import {bogo, bubble, quickSort} from "./algorithms.js";
import {updateColumnColor, generateColumns, shuffleColumns} from "./columns.js";

let shuffle;
let mainSlider;
export let timeSlider;
let output;
let bogoHtml;
let bubbleHtml;
let quickSortHtml;
let bubbleToggle;
export let iterationCounter;
let colorPickerStart;
let colorPickerEnd;
let stopButton;

let menu;
let selectionMenu;
export let htmlColumns;

export let startHex;
export let endHex;

let bubbleVariant = "slow";
export let isRunning = false;

let timeoutId;

export const columns = [];

window.onload = function () {
    // Get references to html elements
    shuffle = document.getElementById("shuffle");
    mainSlider = document.getElementById("main-slider");
    timeSlider = document.getElementById("ms-between-sorts");
    output = document.getElementById("output");
    bogoHtml = document.getElementById("bogo");
    bubbleHtml = document.getElementById("bubble");
    quickSortHtml = document.getElementById("quick-sort");
    iterationCounter = document.getElementById("iteration-counter");
    colorPickerStart = document.getElementById("color-picker-start");
    colorPickerEnd = document.getElementById("color-picker-stop");
    stopButton = document.getElementById("stop-button");
    menu = document.getElementById("menu");
    selectionMenu = document.getElementById("selection-menu");
    htmlColumns = document.getElementsByClassName("column");

    // Store the start and end colors in RGB
    startHex = hexToRgb(colorPickerStart.value);
    endHex = hexToRgb(colorPickerEnd.value);

    output.innerHTML = mainSlider.value;

    // Generate the initial columns
    generateColumns(mainSlider.value);

    selectionMenu.addEventListener('mouseenter', (e) => {
        selectionMenu.classList.add("visible");
        clearTimeout(timeoutId);
    })
    selectionMenu.addEventListener('mouseleave', (e) => {
        timeoutId = setTimeout(() => {
            selectionMenu.classList.remove("visible");
        }, 300);

    })

    // Hides the selection menu when clicked outside off the menu
    document.addEventListener('click', (event) => {
        if (!selectionMenu.contains(event.target) && !menu.contains(event.target)) {
            selectionMenu.classList.remove('visible');
        }
    });
    menu.onclick = function () {

        if (selectionMenu.classList.contains("visible")) {
            selectionMenu.classList.remove("visible");
        } else {
            selectionMenu.classList.add("visible");
        }
    }
    shuffle.onclick = function () {
        isRunning = false;
        shuffleColumns();
    };
    bogoHtml.onclick = function () {
        if (!isRunning) {
            isRunning = true;
            bogo().then(r => isRunning = false);
        }

    };
    bubbleHtml.onclick = function () {
        if (!isRunning) {
            isRunning = true;
            bubble().then(r => isRunning = false);
        }
    };
    quickSortHtml.onclick = function () {
        if (!isRunning) {
            isRunning = true;
            quickSort().then(r => isRunning = false);
        }
    }
    stopButton.onclick = function () {
        isRunning = false;
    };
    colorPickerStart.oninput = function () {
        startHex = hexToRgb(colorPickerStart.value);
        updateColumnColor();
    };
    colorPickerEnd.oninput = function () {
        endHex = hexToRgb(colorPickerEnd.value);
        updateColumnColor();
    };
    mainSlider.oninput = function () {
        output.innerHTML = this.value;
        generateColumns(mainSlider.value);
    };
}


// Function that returns true if the columns are sorted and false otherwise
export function checkIfSorted() {
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