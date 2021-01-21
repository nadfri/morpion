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
        if (player1) {
            box.innerHTML = "x";
            tabPlayer1.push(box.dataset.value);
            checkWin("Player ONE", tabPlayer1);
        } else {
            box.innerHTML = "o";
            tabPlayer2.push(box.dataset.value);
            checkWin("Player TWO", tabPlayer2);
        }

        togglePlayer();


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
    whoBegin();
    tabPlayer1 = [];
    tabPlayer2 = [];
    round = 0;
    gameOver = false;
    cloneInfo.textContent = info.textContent;

    for (let box of boxes) {
        box.textContent = "";
        box.style.backgroundColor = "teal";
    }
}
/*Reset Button*/
resetBTN.onclick = reset;

/*Toggle Player*/
function togglePlayer() {
    player1 = !player1 //change first player
    info.textContent = player1 ? "Round of Player One" : "Round of Player Two";
}

/*First Begin*/
function whoBegin() {
    player1Begin = !player1Begin;
    player1 = player1Begin ? false : true; //change first player
    togglePlayer();
}



