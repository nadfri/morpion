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
    box.onclick = () => play(box);
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

        player1 = !player1;//Change player

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
        for (let value of tabPlayer) {
            if (win.includes(value))
                count++;//if 3 values found, player wins
        }

        if (count == 3) {
            gameOver = true; //game is over
            setTimeout(() => {
                alert(player + " WINS!!!" + "\nPlay Again?");
                reset();
            }, 300);
        }
    }

    /*Case of Equality, Max 9 rounds*/
    if (round == 9 && gameOver == false) {
        setTimeout(() => {
            alert("Equality...\nPlay Again?");
            reset();
        }, 300);
    }
}

/*Reset the Game*/
function reset() {
    player1Begin = !player1Begin;
    player1 = player1Begin ? true : false; //change first player
    tabPlayer1 = [];
    tabPlayer2 = [];
    round = 0;
    gameOver = false;

    for (let box of boxes) {
        box.textContent = "";
    }
}
/*Reset Button*/
resetBTN.onclick = reset;
