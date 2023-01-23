window.onload = main;
let amountOfSorts = 10;
const columns = [];

function main() {
    generateColumns(amountOfSorts);
}


function generateColumns(size) {
    //Creating a loop that adds the pillars an array
    for (let i = 0; i < size; i++) {
        let column = document.createElement("div");

        //Sets the classname to "column"
        column.classList.add("column");
        //Defines the height and width
        column.style.width = 100 / size + "%";
        column.style.height = (i + 1) * (100 / size) + "%";
        //Adding the div to the sorting area.
        columns.push(column);
    }
    visualizeColumns()
}

function visualizeColumns() {
    //Function that visualizes the pillars in the array
    let sortingArea = document.getElementById("sorting_area");
    for (let i = 0; i < columns.length; i++) {
        sortingArea.append(columns[i]);
    }
}