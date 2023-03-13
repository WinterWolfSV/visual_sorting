import {
    columns,
    htmlColumns,
    isRunning,
    iterationCounter,
    timeSlider,
    checkIfSorted
} from './script.js';
import {shuffleColumns, visualizeColumns} from './columns.js';

// Function that implements the bogo sort algorithm
export async function bogo() {
    // Creates a counter to keep track of the number of iterations
    let counter = 0;
    // Loop until the columns array is sorted
    while (!checkIfSorted() && isRunning) {
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
export async function bubble(counter = 0) {
    // Get the length of the columns array
    const columnLength = columns.length;
    // Initialize a counter variable to keep track of the number of iterations
    // Continue looping until the columns are sorted or the sorting process is stopped
    while (!checkIfSorted() && isRunning) {
        // Loop through all pairs of adjacent columns
        for (let i = 0; i < columnLength - 1; i++) {
            // Get the index numbers of the current and next columns
            let nextColumn = parseInt(columns[i + 1].dataset.indexNumber);
            // If the current column is greater than or equal to the next column, swap them
            if (columns[i].dataset.indexNumber >= nextColumn && isRunning) {
                let temp = columns[i + 1];
                columns[i + 1] = columns[i];
                columns[i] = temp;
                // Wait for the amount of time given by the time slider before continuing
                await new Promise(r => setTimeout(r, timeSlider.value));
                // Move the HTML elements representing the columns on the page to match the new order
                htmlColumns[i].parentElement.insertBefore(htmlColumns[i + 1], htmlColumns[i]);
                // Increment the iteration counter and update the corresponding HTML element
                counter++;
                iterationCounter.innerHTML = '' + counter;
            }
        }
    }
}

export async function quickSort() {
    const columnLength = columns.length;
    let counter = 0;
    await recursiveQuickSort(0, columnLength - 1);

    async function recursiveQuickSort(start, end) {
        try {
            if (start >= end) {
                return;
            }
            let tStart = start, tEnd = end;
            let pivot = columns[Math.floor(Math.random() * (end - start + 1) + start)];
            while (start < end) {
                while (columns[start].dataset.indexNumber <= pivot.dataset.indexNumber) start++;
                while (columns[end].dataset.indexNumber > pivot.dataset.indexNumber) end--;
                counter++;
                if (start < end) {
                    let temp = columns[start];
                    columns[start] = columns[end];
                    columns[end] = temp;
                    await new Promise(r => setTimeout(r, timeSlider.value));
                    visualizeColumns()
                    iterationCounter.innerHTML = '' + counter;
                }
            }
            await recursiveQuickSort(tStart, start - 1);
            await recursiveQuickSort(start, tEnd);
        } catch (e) {
        }
    }

    if (!checkIfSorted()) {
        await bubble(counter);
    }
}


//function quickSort(array, start, end) {
//    if (start === undefined) {
//        start = 0;
//        end = array.length - 1;
//    } else if (start >= end) {
//        return array;
//    }
//    var rStart = start, rEnd = end;
//    var pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];
//    while (start < end) {
//        while (array[start] <= pivot) start++;
//        while (array[end] > pivot) end--;
//        if (start < end) {
//            var temp = array[start];
//            array[start] = array[end];
//            array[end] = temp;
//        }
//    }
//    quickSort(array, rStart, start - 1);
//    quickSort(array, start, rEnd);
//}


async function switchTwo(a, b, counter) {
    counter++;
    let temp = columns[a];
    columns[a] = columns[b];
    columns[b] = temp;
    await new Promise(r => setTimeout(r, timeSlider.value));
    visualizeColumns()
    console.log(counter)
    iterationCounter.innerHTML = '' + counter;
    return counter;
}