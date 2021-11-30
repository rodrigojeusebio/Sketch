const container = document.querySelector('.container')
const buttons = document.querySelectorAll('button')
const black = "#190707";
const clear = "rgba(0, 0, 0, .1)";
let main_color = black;

function creatDivs(col , rows) {
    for(let i = 0;i < (col * rows); i++) {
        const div = document.createElement('div') 
        container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        container.appendChild(div).classList.add('box')
    }
}
creatDivs(16,16)

const boxes = document.querySelectorAll('.box')

boxes.forEach(box => {
    box.addEventListener("mouseenter", function(){
        box.style.backgroundColor = main_color;
    });
});


buttons.forEach(button => {
    button.addEventListener("click", function(){
        if (button.classList.value == "clear"){
            boxes.forEach(box => {
                box.style.backgroundColor = clear;
            });
        }
        if (button.classList.value == "eraser"){
            main_color = clear;
        }
    });
});
