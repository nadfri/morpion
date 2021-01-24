"use strict";
let player1 = true;
let player1Begin = true;
let gameOver = false;
let round = 0;
let tabPlayer1 = [];
let tabPlayer2 = [];
const boxes = document.querySelectorAll(".box");
const tabOfWins = [
  [8, 1, 6],
  [3, 5, 7],
  [4, 9, 2],
  [8, 3, 4],
  [1, 5, 9],
  [6, 7, 2],
  [8, 5, 2],
  [6, 5, 4],
];

/*Magic Square
|8|1|6| => 15
|3|5|7| => 15
|4|9|2| => 15
*/

//Adding Events Click on all box
for (let box of boxes) box.onclick = () => play(box);

//Function of play
function play(box) {
  if (box.textContent == "") {
    box.style.color = "blue";
    box.style.backgroundColor = "teal";
    box.textContent = "x";
    tabPlayer1[box.dataset.value] = parseInt(box.dataset.value);
    checkWin("Player ONE", tabPlayer1);
    skyNetplay();
  } else {
    //box not empty
    box.style.backgroundColor = "red";
    setTimeout(() => (box.style.backgroundColor = "#11698e"), 500);
  }
}

/*Win Checking*/
function checkWin(player, tabPlayer) {
  round++;

  for (let win of tabOfWins) {
    let victory = 0;

    for (let value of win) {
      victory += tabPlayer[value];
    }

    if (victory == 15) {
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
    gameOver = true;
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

  for (let box of boxes) {
    box.textContent = "";
    box.style.backgroundColor = "#11698e";
    box.style.color = "white";
  }
  player1Begin = !player1Begin;
  if (!player1Begin) skyNetplay();
}
/*Reset Button*/
resetBTN.onclick = reset;

/*IA of SkyNet*/
function choiceIA(tabPlayer)
{
    for (let win of tabOfWins)
    {
        let filter = [];
        filter = win.filter(el=> !tabPlayer.includes(el));
        if(filter.length == 1 && document.getElementById("box"+filter[0]).textContent =="")
            return filter[0];
    }
}

/*Choice of IA*/
function skyNetplay() {
  if (gameOver == false) 
  {
    setTimeout(() => 
    {
      /*If IA first Player, plays center box*/  
      if (box5.textContent == "") 
      {
        box5.textContent = "o";
        box5.style.backgroundColor = "#466f6f";
        tabPlayer2[5] = 5;
      } 

      else
      {
        /*If IA fisrt Player plays attack, else plays defense*/
        let tabPlayer = player1Begin? tabPlayer1 : tabPlayer2;
        let choice  = choiceIA(tabPlayer);

        if(choice)
        {
            tabPlayer2[choice] = choice;
            let id = document.getElementById("box"+choice);
            id.textContent = "o";
            id.style.backgroundColor = "#466f6f";
        }

        else
        {
            /*If no risk, Ia plays random*/
            let emptyBoxes = Array.from(boxes).filter(
            (box) => box.textContent == "");

            let max = emptyBoxes.length - 1;
            let randomBox = Math.floor(Math.random() * (max + 1));
            emptyBoxes[randomBox].textContent = "o";
            emptyBoxes[randomBox].style.backgroundColor = "#466f6f";
            tabPlayer2[emptyBoxes[randomBox].dataset.value] = parseInt(emptyBoxes[randomBox].dataset.value
            );
        }

      }
      checkWin("SkyNet", tabPlayer2);
    }, 100);
  }
}
