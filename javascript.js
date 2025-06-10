const header = document.querySelector("#header");
const container = document.querySelector('#container');

const userBtn = document.createElement("button");
userBtn.textContent = "Choose number of squares";

const changeStyleBtn = document.createElement("button");
changeStyleBtn.textContent = "Draw in black and white";

header.appendChild(userBtn);
header.appendChild(changeStyleBtn);

let num = 16;
let drawInColor = true;

function changeDrawingStyle() {
    if (drawInColor) {
        drawInColor = false;
        changeStyleBtn.textContent = "Use pretty random colors";
    }

    else {
        drawInColor = true;
        changeStyleBtn.textContent = "Draw in black and white";
    }

    let startnewGrid = confirm("Would you like to reset the grid?")
    if (startnewGrid) {
        userInput();
    }
}

function hoverEffect() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.addEventListener('mouseover', mouseenter));
}

function setUpGrid(num) {
    for (let i = 0; i < num; i++) {
        const row = document.createElement('div');
        row.setAttribute("class", "row");
        for (let j = 0; j < num; j++){
            const div = document.createElement('div');
            div.setAttribute("class", "square");
            div.setAttribute("style", `width: ${(visualViewport.height-80)/num}px; height: ${(visualViewport.height-80)/num}px`);
            row.appendChild(div);
        }
    container.appendChild(row);
    }
    hoverEffect();
}

function mouseenter(e) {
    let currentOpacity = Number (e.target.style.opacity);
    if (e.target.style.backgroundColor == ""){
        e.target.style.opacity = 0.1;

        if (drawInColor) {
            const randomColor = "#"+((1<<24)*Math.random()|0).toString(16);
            e.target.style.backgroundColor = randomColor;
        }else {
            e.target.style.backgroundColor = "black";
        }
    } else {
        if (currentOpacity < 1) {
            e.target.style.opacity = currentOpacity + 0.1;
        }
    }
}

function deleteGrid() {
    container.replaceChildren();
}

function userInput() {
    let input = Number(prompt("Enter a number"));
    while (input > 100 || !Number.isInteger(input)) {
        input = Number(prompt("Enter a number up to 100."));
    }
    deleteGrid();
    setUpGrid(input);
}

setUpGrid(num);

userBtn.addEventListener('click', userInput);
changeStyleBtn.addEventListener('click', changeDrawingStyle);