window.onload = main;

function main() {
    let shuffle = document.getElementById("shuffle");
    let mainSlider = document.getElementById("main-slider");
    let timeSlider = document.getElementById("ms-between-sorts");
    let output = document.getElementById("output");
    let bogoHtml = document.getElementById("bogo");
    let bubbleHtml = document.getElementById("bubble");
    let checkSort = document.getElementById("checkSort");
    let iterationCounter = document.getElementById("iteration-counter");

    const columns = [];

    output.innerHTML = mainSlider.value;

    generateColumns(mainSlider.value);
    checkSort.onclick = function () {
        console.log(checkIfSorted());
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

    mainSlider.oninput = function () {
        output.innerHTML = this.value;
        generateColumns(mainSlider.value);
    }

    function generateColumns(size) {
        //Clears the column list
        columns.splice(0, columns.length);

        //Creating a loop that adds the pillars an array
        for (let i = 0; i < size; i++) {
            let column = document.createElement("div");

            //Sets the classname to "column"
            column.classList.add("column");
            //Defines the height and width
            column.dataset.indexNumber = i.toString();
            let percentage = i / size;
            console.log(percentage);
            let red = Math.round(128 * percentage);
            let green = Math.round(256 * percentage);
            let blue = Math.round(256 * (1 - percentage));

            console.log("#" + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + blue.toString(16).padStart(2, "0"));
            column.style.backgroundColor = "#" + red.toString(16).padStart(2, "0") + green.toString(16).padStart(2, "0") + blue.toString(16).padStart(2, "0");
            column.style.width = 100 / size + "%";
            column.style.height = (i + 1) * (100 / size) + "%";
            //Adding the div to the sorting area.
            columns.push(column);
        }
        visualizeColumns();
    }


    function clearColumns() {
        const columns = document.getElementsByClassName("column");
        while (columns.length > 0) {
            columns[0].parentNode.removeChild(columns[0]);
        }
    }

    function visualizeColumns() {
        clearColumns();
        //Function that visualizes the pillars in the array
        let sortingArea = document.getElementById("sorting_area");
        for (let i = 0; i < columns.length; i++) {
            sortingArea.append(columns[i]);
        }
    }

    function shuffleColumns() {
        const tempColumns = [...columns];
        columns.splice(0, columns.length);
        const columnLength = tempColumns.length;

        for (let i = 0; i < columnLength; i++) {

            let randInt = Math.floor(Math.random() * tempColumns.length);
            columns.push(tempColumns[randInt]);
            tempColumns.splice(randInt, 1);
        }
        visualizeColumns();
    }

    function checkIfSorted() {
        let sorted = true;
        for (let i = 0; i < columns.length - 1; i++) {
            let nextColumn = parseInt(columns[i + 1].dataset.indexNumber);
            if (columns[i].dataset.indexNumber >= nextColumn) {
                sorted = false;
                break;
            }
        }
        return sorted;
    }


    async function bogo() {
        let counter = 0;
        while (!checkIfSorted()) {
            iterationCounter.innerHTML = '' + counter;
            const tempColumns = [...columns];
            columns.splice(0, columns.length);
            const columnLength = tempColumns.length;
            for (let i = 0; i < columnLength; i++) {
                let randInt = Math.floor(Math.random() * tempColumns.length);
                columns.push(tempColumns[randInt]);
                tempColumns.splice(randInt, 1);
            }
            visualizeColumns();
            await new Promise(r => setTimeout(r, timeSlider.value));
            counter++;

        }
    }

    async function bubble() {
        const columnLength = columns.length;
        let counter = 0;
        while (!checkIfSorted()) {

            iterationCounter.innerHTML = '' + counter;
            for (let i = 0; i < columnLength - 1; i++) {
                let nextColumn = parseInt(columns[i + 1].dataset.indexNumber);
                if (columns[i].dataset.indexNumber >= nextColumn) {
                    let temp = columns[i + 1];
                    columns[i + 1] = columns[i];
                    columns[i] = temp;
                }
            }
            await new Promise(r => setTimeout(r, timeSlider.value / columnLength));
            visualizeColumns();
            counter++;
        }
    }
}