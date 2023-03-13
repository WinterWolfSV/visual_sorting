let sortingArea = document.getElementById("sorting_area");

import {
    columns,
    htmlColumns,
    startHex,
    endHex
} from "./script.js";

export function updateColumnColor() {
    for (let i = 0; i < columns.length; i++) {
        // Get the index number of the column
        let index = parseInt(columns[i].dataset.indexNumber);
        // Calculate the percentage for color calculation
        let percentage = index / columns.length;
        if (percentage === 0) {
            percentage = 0.01;
        }
        // Calculate the RGB color value for the column based on the index number
        let red = Math.round(startHex[0] + ((endHex[0] - startHex[0]) * percentage));
        let green = Math.round(startHex[1] + ((endHex[1] - startHex[1]) * percentage));
        let blue = Math.round(startHex[2] + ((endHex[2] - startHex[2]) * percentage));

        // Setting the background color of the column
        columns[i].style.backgroundColor = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
    }
    // Visualizes the columns
    visualizeColumns();
}

// Function to generate the columns
export function generateColumns(size) {
    // Clears the existing columns
    columns.splice(0, columns.length);
    // Loop to add new columns to the columns array
    for (let i = 0; i < size; i++) {
        // Create a new column
        let column = document.createElement("div");
        // Add "column" class to the column
        column.classList.add("column");
        // Setting the index number of the column
        column.dataset.indexNumber = i.toString().padStart(3, "0");
        // Setting the width of the column as a percentage of the sorting area width
        column.style.width = 100 / size + "%";
        // Setting the height of the column as a percentage of the sorting area height
        column.style.height = (i + 1) * (100 / size) + "%";
        // Adding the column to the array of columns
        columns.push(column);
    }
    // Visualizes the columns
    updateColumnColor();
}

//Function to clear all columns
export function clearColumns() {
    // While there are still columns left, remove them
    while (htmlColumns.length) {
        htmlColumns[0].remove();
    }
}

// Function to visualize the columns in the "sorting_area" HTML element
export function visualizeColumns() {
    // Clears previous columns from the sorting area
    clearColumns();
    // Loop through the columns array
    columns.forEach((column) => {
        // Append each column to the "sorting_area" html div
        sortingArea.append(column);
    });
}

// Function that randomly rearranges the columns in the array "columns"
export function shuffleColumns() {
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