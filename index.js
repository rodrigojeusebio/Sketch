const container = document.querySelector('.container')
let color = black;

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
    box.addEventListener("mouseout", function(){
        box.style.backgroundColor = "red";
        console.log("hello");
    });
});

