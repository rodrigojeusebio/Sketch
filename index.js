const container = document.querySelector('.container')
const buttons = document.querySelectorAll('button')

const BLACK = "#190707";
let backgroundColor = "rgba(255, 255, 255, 0.747)";
let main_color = BLACK;
let random = false

random_color = () => Math.floor(Math.random() * 256);

//Manage divs
function creatDivs(size) {
    for (let i = 0; i < (size * size); i++) {
        const div = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        container.appendChild(div).classList.add('box');
    }
    boxes = document.querySelectorAll(".box")
    boxes.forEach(box => {
        box.addEventListener("mouseenter", function () {
            if (!mouseDown) {
                return;
            }

            box.style.backgroundColor = main_color;
            if (random == true) {
                main_color = `rgb(${random_color()},${random_color()},${random_color()})`
            }
        });
    });
}

function clearDivs() {
    container.innerHTML = "";
}

buttons.forEach(button => {
    button.addEventListener("click", function () {
        if (button.classList.value == "clear") {
            boxes.forEach(box => {
                box.style.backgroundColor = backgroundColor;
                main_color = BLACK;
            });
        } else if (button.classList.value == "eraser") {
            random = false;
            main_color = backgroundColor;
        } else if (button.classList.value == "black") {
            main_color = BLACK;
            random = false;
        } else if (button.classList.value == "random_col") {
            random = true;
        } else if (button.classList.value == "new_grid") {
            let val = parseInt(prompt("grid size"));
            console.log(val)
            if (val > 100 || val < 1 || val === NaN) {
                clearDivs()
                creatDivs(16)
            } else {
                clearDivs()
                creatDivs(val)
            }

        }
    })
});

window.onmousedown = () => {
    mouseDown = true;
}

window.onmouseup = () => {
    mouseDown = false;
}

window.onload = () => {
    creatDivs(16)
}