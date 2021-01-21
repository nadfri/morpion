"use strict";
let player1 = true;
let player1Begin = true;
let gameOver = false;
let round = 0;
let tabPlayer1 = [];
let tabPlayer2 = [];
const boxes = document.querySelectorAll(".box");
const tabOfWins = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "5", "9"],
    ["7", "5", "3"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
];


//Adding Events Click on all box
for (let box of boxes) {
    box.onclick = () => {
        play(box);
        cloneInfo.textContent = info.textContent;
    }
}
//Function of play
function play(box) {
    if (box.textContent == "") {

        box.style.color = "blue";
        box.textContent = "x";
        tabPlayer1.push(box.dataset.value);
        checkWin("Player ONE", tabPlayer1);
        skyNetplay();

    } else {
        //box not empty
        box.style.backgroundColor = "red";
        setTimeout(() => (box.style.backgroundColor = "teal"), 500);
    }
}

/*Win Checking*/
function checkWin(player, tabPlayer) {
    round++;

    for (let win of tabOfWins) {
        let count = 0;
        let result = [];

        for (let value of tabPlayer) {
            if (win.includes(value)) {
                count++;//if 3 values found, player wins
                result.push(value);
            }
        }

        if (count == 3) {
            for (let box of boxes)
                if (result.includes(box.dataset.value))
                    box.style.backgroundColor = "green";

            gameOver = true; //game is over

            /*Score*/
            if (player == "Player ONE") scoreOne.textContent++;
            else scoreTwo.textContent++;

            newGame.innerHTML = `<div>
                                    <p>${player} Wins!!!</p>
                                    <p>New Game? Click Here...</p>
                                 </div>`;

            newGame.style.display = "flex";
            newGame.onclick = reset;
        }
    }

    /*Case of Equality, Max 9 rounds*/
    if (round == 9 && gameOver == false) {
        newGame.innerHTML = `<div>
                                <p>Equality!!!<p>
                                <p>New Game? Click Here...</p>
                             </div>`;
        newGame.style.display = "flex";
        newGame.onclick = reset;
    }
}

/*Reset the Game*/
function reset() {
    newGame.style.display = "none";
    tabPlayer1 = [];
    tabPlayer2 = [];
    round = 0;
    gameOver = false;
    cloneInfo.textContent = info.textContent;

    for (let box of boxes) {
        box.textContent = "";
        box.style.backgroundColor = "teal";
        box.style.color = "white";
    }
    player1Begin = !player1Begin;
    if (!player1Begin) skyNetplay();
}
/*Reset Button*/
resetBTN.onclick = reset;

/*IA of SkyNet*/
function skyNetplay() {

    if (gameOver == false) {
        setTimeout(() => {
            if (boxes[4].textContent == "") {
                boxes[4].textContent = "o";
                tabPlayer2.push("5");
            }
            else {
                let emptyBoxes = Array.from(boxes).filter(box => box.textContent == "");
                let max = emptyBoxes.length - 1;
                let randomBox = Math.floor(Math.random() * (max + 1));
                emptyBoxes[randomBox].textContent = "o";
                tabPlayer2.push(emptyBoxes[randomBox].dataset.value);
            }

            checkWin("SkyNet", tabPlayer2);

        }, 50);
    }
}


