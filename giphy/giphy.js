console.log("Hello world!");
let soundStack = ["","","","","","","",""];
let pet = document.getElementById("pet");
let speechBubble = document.getElementById("speechBubble");
let mouseX, mouseY, petX, petY = 0;
let beingDragged = false;

//Creature Values
let happiness = 10;
let hunger = 10;
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
walkLoop(true);
hungerLoop();
talk(0);
});

////Pet functions
function talk(id, conditions) {
    let text = [
        ["Hmm...", "I like thinking", "I wanna go for a walk", "Pets? omo"], //Normal
        ["Wah!", "I'm getting dizzy!", "What're you doing?!", "@w@", "Please stop!", "Meanie!", "Whoa!", "Blehhh >m<"], //Being shaken
        ["I'm feeling a little hungry...", "*Stomach grumble*", "Snackie? owo", "Hungie...", "I'm hungry"] //Hungry
    ];
    let conditionBools = [
        beingDragged == 0
    ]
    let doTalking = true;
    if (typeof(conditions) == "object") {
        for (let i = 0; i < conditions.length; i++) {
            if (conditionBools[conditions[i]] == false) {
                doTalking = false;
                break;
            }
        }
    } else if (typeof(conditions) == "number") {
        doTalking = conditionBools[conditions];
    }
    if (doTalking) {
        text = text[id][random(0, text[id].length - 1)];
        speechBubble.innerHTML = `${speechBubble.innerHTML}\n> ${text}`;
        speechBubble.scrollTop = speechBubble.scrollHeight;
    }
}
////

////Pet random events
function hungerLoop() {
    if (random(1, 35) == 1) {
        updateHunger("-", 1);
        talk(2, 0);
    }
    setTimeout(hungerLoop, 1000);
}

function walkLoop(override) {
    if (!beingDragged && random(1, 5) == 1 || override) {
        walkTo(random(0, 100), random(0, 100));
    }
    setTimeout(walkLoop, 2000);
}
////

////Pet movement
function walkTo(x, y) {
    petPosition(((pet.parentElement.clientWidth - pet.offsetWidth) / 100) * x, ((pet.parentElement.clientHeight - pet.offsetHeight) / 100) * y);
}
// //Dragging
function startDragPet(event) {
    event.preventDefault();
    beingDragged = true;
    mouseX = event.clientX; 
    mouseY = event.clientY;
    document.onmousemove = movePet;
    document.onmouseup = stopDraggingPet;
}

function movePet(event) {
    event.preventDefault();
    petX = mouseX - event.clientX;
    petY = mouseY - event.clientY;
    if ((Math.abs(event.clientX - mouseX) > 20 || Math.abs(event.clientY - mouseY) > 20) && random(1,35) == 1) {
        talk(1);
        updateHappiness("-", 1);
    }
    mouseX = event.clientX;
    mouseY = event.clientY;


    petPosition(pet.offsetLeft - petX, pet.offsetTop - petY);
}

function stopDraggingPet() {
    beingDragged = false;
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
        let halfHeight = (pet.offsetHeight / 2);
        pet.style.top = clamp(y, 0 - halfWidth, pet.parentElement.clientWidth - pet.offsetWidth + halfWidth) + "px";
        pet.style.left = clamp(x, 0 - halfHeight, pet.parentElement.clientHeight - pet.offsetHeight + halfHeight) + "px";
    }
}
// //
////

////Pet value control
function playSound(sound) {
    soundStack.splice(0, 0, new Audio(sound));
    soundStack[0].volume = 0.35;
    soundStack[0].play();
    soundStack.pop();
}

function updateMoney(action, integer) {
    if (action == "-") {
        money -= integer;
    } else if (action == "+") {
        money += integer;
    }
    document.getElementById("money").innerText = `Money: £${money}`;
}

function updateHappiness(action, integer) {
    if (action == "-") {
        happiness -= integer;
    } else if (action == "+") {
        happiness += integer;
    }
    happiness = clamp(happiness, 0, 10);
    let text = "";
    for (let i = 0; i < Math.floor(happiness / 2); i++) {
        text = text + "*";
    }
    if (happiness % 2 != 0) {
        text = text + "^";
    }
    for (let i = 0; i < Math.floor((10 - happiness) / 2); i++) {
        text = text + "_";
    }
    document.getElementById("happiness").innerText = `Happiness: ${text}`;
}

function updateHunger(action, integer) {
    if (action == "-") {
        hunger -= integer;
    } else if (action == "+") {
        hunger += integer;
    }
    hunger = clamp(hunger, 0, 10);
    if (hunger == 0 && random(1, 10) == 1) {
        updateHappiness("-", 1);
    } 
    let text = "";
    for (let i = 0; i < Math.floor(hunger / 2); i++) {
        text = text + "*";
    }
    if (hunger % 2 != 0) {
        text = text + "^";
    }
    for (let i = 0; i < Math.floor((10 - hunger) / 2); i++) {
        text = text + "_";
    }
    document.getElementById("hunger").innerText = `Hunger: ${text}`;
}
////

////Core functions
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
    return Math.floor(Math.random() * (max - min + 1) + min);
}
////