const BLACK = "#190707";

randomColoror = () => Math.floor(Math.random() * 256);

class Canvas {
    mouseDown;
    randomColor = false;
    backgroundColor = "rgba(255, 255, 255, 1)";
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
        button.style.borderColor = '#8ea7a5ff';
        this.cleanButtonSettingSelection(button);
    }

    cleanButtonSettingSelection(button = false) {
        let buttons = document.querySelectorAll('.options')
        buttons.forEach((buttonOption) => {
            if (button && button == buttonOption) {
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
        this.randomColor = false;
        this.mainColor = BLACK;
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

    setSpecificColor() {
        this.mainColor = document.querySelector('#specificColor').value
        this.randomColor = false;
        this.colorActiveButton('specificColorButton')
    }

    initEventListener() {
        document.querySelector('input').addEventListener('blur', () => {
            this.setSpecificColor();
        });
        this.buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (button.id == "clear") {
                    this.setClear()
                } else if (button.id == "eraser") {
                    this.setEraser()
                } else if (button.id == "black") {
                    this.setBlack()
                } else if (button.id == "specificColorButton") {
                    this.setSpecificColor()
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
                else if (button.id == "download") {
                    const boxes = container.querySelectorAll(".box");

                    // Get grid size
                    const styles = getComputedStyle(this.container);
                    const cols = styles.gridTemplateColumns.split(" ").length;
                    const rows = styles.gridTemplateRows.split(" ").length;

                    const cellWidth = boxes[0].offsetWidth;
                    const cellHeight = boxes[0].offsetHeight;

                    // Build SVG string
                    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * cellWidth}" height="${rows * cellHeight}">`;

                    boxes.forEach((pixel, i) => {
                        const color = getComputedStyle(pixel).backgroundColor;
                        const x = (i % cols) * cellWidth;
                        const y = Math.floor(i / cols) * cellHeight;

                        svg += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="${color}" />`;
                    });

                    svg += `</svg>`;

                    // Download SVG
                    const blob = new Blob([svg], { type: "image/svg+xml" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = "my_sketch.svg";
                    link.click();
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
}

window.onmouseup = () => {
    canvas.mouseDown = false;
}

window.onload = () => {
    canvas.creatDivs(16)
}