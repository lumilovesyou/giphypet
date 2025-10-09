console.log("Hello world!");
let soundStack = ["","","","","","","",""];
let pet = document.getElementById("pet");
let mouseX, mouseY, petX, petY = 0
let money = 10;

document.addEventListener("DOMContentLoaded", () => {
let shopRows = document.getElementsByClassName("shop-row");
for (let i = 0; i < shopRows.length; i++) {
    let shopItems = shopRows[i].children;
    for (let j = 0; j < shopItems.length; j++) {
        shopItems[j].addEventListener("click", () => {
            if (money >= 5) {
                updateMoney("-", 5);
                playSound("./assets/audio/purchase.mp3");
            }
        });
    }
}

pet.onmousedown = startDragPet;
});

////Pet movement
function startDragPet(event) {
    event.preventDefault();
    mouseX = event.clientX; 
    mouseY = event.clientY;
    document.onmousemove = movePet;
    document.onmouseup = stopDraggingPet;
}

function movePet(event) {
    event.preventDefault();
    petX = mouseX - event.clientX;
    petY = mouseY - event.clientY;
    mouseX = event.clientX;
    mouseY = event.clientY;

    petPosition(pet.offsetLeft - petX, pet.offsetTop - petY);
}

function stopDraggingPet() {
    document.onmouseup = null;
    document.onmousemove = null;
    petPosition(pet.offsetLeft - petX, pet.offsetTop - petY, true);
}

function petPosition(x, y, hardClamp) {
    if (hardClamp) {
        pet.style.top = clamp(y, 0, pet.parentElement.clientWidth - pet.offsetWidth + 3) + "px";
        pet.style.left = clamp(x, 0, pet.parentElement.clientHeight - pet.offsetHeight - 3) + "px";
    } else {
        let halfWidth = (pet.offsetWidth / 2);
        let halfHeight = (pet.offsetHeight / 2)
        pet.style.top = clamp(y, 0 - halfWidth, pet.parentElement.clientWidth - pet.offsetWidth + halfWidth) + "px";
        pet.style.left = clamp(x, 0 - halfHeight, pet.parentElement.clientHeight - pet.offsetHeight + halfHeight) + "px";
    }
}
////

function playSound(sound) {
    soundStack.splice(0, 0, new Audio(sound));
    soundStack[0].play();
    soundStack.pop();
}

function updateMoney(action, integer) {
    if (action == "-") {
        money -= integer;
    } else if (action == "+") {
        money += integer;
    }
    document.getElementById("money").innerText = "Money: £" + money;
}

//Core functions
function clamp(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}