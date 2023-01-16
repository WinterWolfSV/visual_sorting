let sortingArea = document.getElementById("sorting_area");


let amountOfSorts = 10;

for (let i = 0; i < amountOfSorts; i++) {
    console.log(i)
    
    CreateDiv(i);
}

function CreateDiv(content) {
    let newDiv = document.createElement("div");
    let divContent = document.createTextNode(content);
    newDiv.append(divContent);

    document.body.insertBefore(newDiv, sortingArea);

}