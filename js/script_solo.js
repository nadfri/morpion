"use strict";
let player1Begin = true;
let player1      = true;
let gameOver     = false;
let tabPlayer1   = [];
let tabPlayer2   = [];
let round        = 0;

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

/****************Adding Events Click on all box****************/
for (let box of boxes) box.onclick = () => play(box);

/****************Player and IA play****************/
function play(box) {
  if (box.textContent == "") {
    box.style.color = "blue";
    box.style.backgroundColor = "teal";
    box.textContent = "x";
    tabPlayer1[box.dataset.value] = box.dataset.value;
    checkWin("Player ONE", tabPlayer1);

    /*IA Plays*/
    skyNetplay();
  } 

  else 
  {
    /*box not empty*/
    box.style.backgroundColor = "red";
    setTimeout(() => (box.style.backgroundColor = "#11698e"), 500);
  }
}


/****************IA of SkyNet****************/
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
/*Random IA Choices*/
function randomChoice()
{
    /*Array.from transform querySelectorAll to a true array*/
    let empty = Array.from(boxes).filter(
        (box) => box.textContent == "");

    let max    = empty.length - 1;
    let random = Math.floor(Math.random() * (max + 1)).toString();
    empty[random].textContent           = "o";
    empty[random].style.backgroundColor = "#466f6f";
    tabPlayer2[empty[random].dataset.value] = empty[random].dataset.value;
}

/*Specific Choices of IA*/
function skyNetplay() {
  if (gameOver == false) 
  {
    setTimeout(() => 
    {
      /*If IA first Player, plays center box*/  
      if (box5.textContent == "") 
      {
        box5.style.backgroundColor = "#466f6f";
        box5.textContent = "o";
        tabPlayer2[5]    = "5";
      } 

      else
      {
        let choiceDefense = choiceIA(tabPlayer1);
        let choiceAttack  = choiceIA(tabPlayer2);
        let choice = choiceAttack? choiceAttack : choiceDefense;
        
        console.log(choice);

        if(choice)
        {
            tabPlayer2[choice] = choice;
            let id = document.getElementById("box"+choice);
            id.textContent           = "o";
            id.style.backgroundColor = "#466f6f";
        }

        else randomChoice();

      }
      checkWin("SkyNet", tabPlayer2);
    }, 100);
  }
}

/****************Win Checking****************/
function checkWin(player, tabPlayer) {
    round++;
  
    for (let win of tabOfWins) 
    {
        let count = 0;
        let result = [];

        for (let value of tabPlayer) 
        {
            if (win.includes(value)) 
            {
                count++;//if 3 values found, player wins
                result.push(value);
            }
        }

        if (count == 3) 
        {
            for (let box of boxes)
                if (result.includes(box.dataset.value))
                    box.style.backgroundColor = "green";

            gameOver = true; //game is over
        
            /*Score update*/
            if (player == "Player ONE") scoreOne.textContent++;
            else scoreTwo.textContent++;

            newGame.innerHTML = `<div>
                                <p>${player} Wins!!!</p>
                                <p>New Game? Click Here...</p>
                                </div>`;

            newGame.style.display = "flex";
            newGame.onclick       = reset;
        }
    }
  
    /*Case of Equality, Max 9 rounds*/
    if (round == 9 && gameOver == false) 
    {
      gameOver = true;
      newGame.innerHTML = `<div>
                           <p>Equality!!!<p>
                           <p>New Game? Click Here...</p>
                          </div>`;
  
      newGame.style.display = "flex";
      newGame.onclick       = reset;
    }
  }
  
  /****************Reset the Game****************/
  function reset() {
    newGame.style.display = "none";
    tabPlayer1 = [];
    tabPlayer2 = [];
    round      = 0;
    gameOver   = false;
  
    for (let box of boxes) 
    {
      box.style.backgroundColor = "#11698e";
      box.textContent = "";
      box.style.color = "white";
    }
    player1Begin = !player1Begin;
    if (!player1Begin) skyNetplay();
  }

  /*Reset Button*/
  resetBTN.onclick = reset;
