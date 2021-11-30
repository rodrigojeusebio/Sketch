const container = document.querySelector('.container')
const buttons = document.querySelectorAll('button')

const black = "#190707";
const background_Color = "rgba(255, 255, 255, 0.747)";
let main_color = black;
let random = false


//Manage divs
function creatDivs(size) {
    for(let i = 0;i < (size * size); i++) {
        const div = document.createElement('div') ;
        container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        container.appendChild(div).classList.add('box');
    }
    boxes = document.querySelectorAll(".box")
    boxes.forEach(box => {
    box.addEventListener("mouseenter", function(){
        box.style.backgroundColor = main_color;
        if(random == true){
            main_color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            console.log(main_color)
        }
    });
});
}

function clearDivs(){
    container.innerHTML = "";
}

buttons.forEach(button => {
    button.addEventListener("click",function(){
        if (button.classList.value == "clear"){
            boxes.forEach(box => {
                box.style.backgroundColor = background_Color;
                main_color = black;
            });
        }else if (button.classList.value == "eraser"){
            random = false;
            main_color = background_Color;
        }else if (button.classList.value == "black"){
            main_color = black;
            random = false;
        }else if (button.classList.value == "random_col"){
            random = true;
        }else if (button.classList.value == "new_grid"){
            let val = parseInt(prompt("grid size"));
            console.log(val)
            if (val > 100 || val < 1 || val === NaN){
                clearDivs()
                creatDivs(16)
            } else{
                clearDivs()
                creatDivs(val)
            }
            
        }
    })
});


window.onload = () => {
    creatDivs(16)
  }