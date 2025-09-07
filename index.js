const BLACK = "#190707";

randomColoror = () => Math.floor(Math.random() * 256);

class Canvas {
    mouseDown;
    randomColor = false;
    backgroundColor = "rgba(255, 255, 255, 0.747)";
    mainColor = BLACK;
    boxes;

    constructor(container, buttons) {
        this.container = container;
        this.buttons = buttons;
        this.mouseDown = false;
    };

    creatDivs(size) {
        for (let i = 0; i < (size * size); i++) {
            const div = document.createElement('div');
            this.container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            this.container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
            this.container.appendChild(div).classList.add('box');
        }

        this.boxes = document.querySelectorAll(".box");

        this.boxes.forEach(box => {
            box.addEventListener("mouseenter", () => {
                if (!this.mouseDown) {
                    return;
                }

                box.style.backgroundColor = this.mainColor;
                if (this.randomColor == true) {
                    this.mainColor = `rgb(${randomColoror()},${randomColoror()},${randomColoror()})`
                }
            });
        });
    }

    clearDivs() {
        this.container.innerHTML = "";
    }

    colorActiveButton(buttonIdentifier) {
        let button = document.querySelector(`#${buttonIdentifier}`);
        button.style.backgroundColor = '#8ea7a5ff';

        let buttons = document.querySelectorAll('.options')
        buttons.forEach((buttonOption) => {
            if (button == buttonOption) {
                return;
            }
            buttonOption.style.backgroundColor = '';
        })
    }

    setEraser() {
        this.randomColor = false;
        this.mainColor = this.backgroundColor;
        this.colorActiveButton('eraser')
    }

    setBlack() {
        this.mainColor = BLACK;
        this.randomColor = false;
        this.colorActiveButton('black')
    }

    setRandomColor() {
        this.randomColor = true;
        this.colorActiveButton('randomColor')
    }

    setClear() {
        this.boxes.forEach(box => {
            box.style.backgroundColor = this.backgroundColor;
        });
    }

    initEventListener() {
        this.buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.id == "clear") {
                    this.setClear()
                } else if (button.id == "eraser") {
                    this.setEraser()
                } else if (button.id == "black") {
                    this.setBlack()
                } else if (button.id == "randomColor") {
                    this.setRandomColor()
                } else if (button.id == "new_grid") {
                    let val = parseInt(prompt("Grid size (Between 1 and 200)"));
                    if (val > 200 || val < 1 || val === NaN) {
                        this.clearDivs()
                        this.creatDivs(16)
                    } else {
                        this.clearDivs()
                        this.creatDivs(val)
                    }
                }
            })
        });
    }
}

const container = document.querySelector('.container')
const buttons = document.querySelectorAll('button')

const canvas = new Canvas(container, buttons);
canvas.initEventListener();

window.onmousedown = () => {
    canvas.mouseDown = true;
    console.log(canvas.mouseDown)
}

window.onmouseup = () => {
    canvas.mouseDown = false;
}

window.onload = () => {
    canvas.creatDivs(16)
}