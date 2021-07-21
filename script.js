(function () {

    "use strict";

    const startGame = document.getElementById("startgame");
    const gameControl = document.getElementById("gamecontrol");
    const game = document.getElementById("game");
    const score = document.getElementById("score");
    const actionArea = document.getElementById("actions");

    const gameData = {
        dice: ["images/1die.jpg", "images/2die.jpg", "images/3die.jpg", "images/4die.jpg", "images/5die.jpg", "images/6die.jpg"],
        players: ["player 1", "player 2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 49
    };

    startGame.addEventListener("click", function () {
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = '<h2 class="text-center">The Game has Started !</h2>';
        gameControl.innerHTML += '<div class="text-center btn1"><button class="btn btn-danger" id="quit">Quit Game</button></div>';

        document.getElementById("quit").addEventListener("click", function () {
            location.reload();
        });

        console.log(gameData.index);
        setUpTurn();

    });

    function setUpTurn() {
        game.innerHTML = `<h2 class="text-center">Roll the dice for the ${gameData.players[gameData.index]}</h2>`;
        actionArea.innerHTML = '<button class="btn btn-info" id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener("click", function () {
            //console.log("roll the dice !");
            throwDice();
        });
    }

    function throwDice() {
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;

        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                         <img src="${gameData.dice[gameData.roll2 - 1]}">`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;
        //gameData.roll1=1;

        if (gameData.rollSum === 2) {
            //console.log("snake eyes were rolled");
            game.innerHTML += '<h4>Oh snap ! Snake eyes!</h4>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            setTimeout(setUpTurn, 2000);
        }

        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            //console.log("One of die is 1 your turn over !");
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<h4>Sorry, one of your roll was a one, switching to ${gameData.players[gameData.index]}</h4>`;
            setTimeout(setUpTurn, 2000);
        }

        else {
            //console.log("Game continues play again or pass");

            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button class="btn btn-success" id="rollagain">Roll Again</button> or <button class="btn btn-warning" id="pass">Pass</button>';
            document.getElementById("rollagain").addEventListener("click", function () {
                throwDice();
            });
            document.getElementById("pass").addEventListener("click", function () {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
        }
        checkWinnigCondition();
    }

    function checkWinnigCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points !</h2>`;

            actionArea.innerHTML = "";
            document.getElementById("quit").innerHTML = "Start a New Game ?";
        }
        else {
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]}  is ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} is ${gameData.score[1]}</strong></p>`;
    }

})();