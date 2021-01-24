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
function skyNetplay() {
  if (gameOver == false) 
  {
    setTimeout(() => 
    {
        /*Test if 2 cases checked*/
        let filter = [];
        for (let win of tabOfWins)
        {
             filter = win.filter(el=> !tabPlayer1.includes(el));
             if(filter.length == 1 && document.getElementById("box"+filter[0]).textContent =="")
             {
                console.log(filter)
                break;
             }
        }

        /*IA play defense*/
        if(filter.length == 1)
        {
            tabPlayer2[filter[0]] = parseInt(filter[0]);
            let id = document.getElementById("box"+filter[0]);
            id.textContent = "o";
            id.style.backgroundColor = "#466f6f";
            checkWin("SkyNet", tabPlayer2);
        }

        else
        {
            let emptyBoxes = Array.from(boxes).filter(
            (box) => box.textContent == "");

            let max = emptyBoxes.length - 1;
            let randomBox = Math.floor(Math.random() * (max + 1));
            emptyBoxes[randomBox].textContent = "o";
            emptyBoxes[randomBox].style.backgroundColor = "#466f6f";
            tabPlayer2[emptyBoxes[randomBox].dataset.value] = parseInt(emptyBoxes[randomBox].dataset.value
            );
            checkWin("SkyNet", tabPlayer2);
        }




    //   if (box5.textContent == "") 
    //   {
    //     box5.textContent = "o";
    //     box5.style.backgroundColor = "#466f6f";
    //     tabPlayer2[5] = 5;
    //   } 

    //   else 
    //   {
    //     let played = [...tabPlayer1, ...tabPlayer2];

    //     for (let win of tabOfWins) 
    //     {

    //         let count = [];

    //         for(let element of win)
    //         {
    //             if(!played.includes(element) && element)
    //                 count.push(element);
    //         }

    //         console.log(count)     
    //         if (count.length == 1) 
    //         {
    //             console.log("IA")
    //             tabPlayer2[count[0]] = parseInt(count[0]);
    //             let id = document.getElementById("box"+count[0]);
    //             id.textContent = "o";
    //             id.style.backgroundColor = "#466f6f";
    //             checkWin("SkyNet", tabPlayer2);
    //             return;
    //         } 

    //         else
    //         {
    //             let emptyBoxes = Array.from(boxes).filter(
    //                 (box) => box.textContent == ""
    //             );

    //             let max = emptyBoxes.length - 1;
    //             let randomBox = Math.floor(Math.random() * (max + 1));
    //             emptyBoxes[randomBox].textContent = "o";
    //             emptyBoxes[randomBox].style.backgroundColor = "#466f6f";
    //             tabPlayer2[emptyBoxes[randomBox].dataset.value] = parseInt(emptyBoxes[randomBox].dataset.value
    //             );
    //             checkWin("SkyNet", tabPlayer2);
    //             return;
    //         }  
    //     }
    //   }

      //checkWin("SkyNet", tabPlayer2);
    }, 100);
  }
}
