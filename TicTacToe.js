<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add your CSS styling here */
    </style>
</head>
<body>
    <h1>Tic-Tac-Toe</h1>
    <div id="player-names">
        <input type="text" id="player1" placeholder="Player 1 Name">
        <input type="text" id="player2" placeholder="Player 2 Name">
        <button onclick="startGame()">Start Game</button>
    </div>
    <div id="game-board">
        <!-- Add your game board here -->
    </div>
    <div id="message">Player 1's turn</div>
    <div id="score">
        <p>Score:</p>
        <p id="player1-score">Player 1: 0</p>
        <p id="player2-score">Player 2: 0</p>
    </div>
    <button id="restart-button" onclick="restartGame()">Restart Game</button>
    <script>
        let currentPlayer = 1;
        let player1Name = "Player 1";
        let player2Name = "Player 2";
        let player1Score = 0;
        let player2Score = 0;
        let gameActive = false;

        const cells = document.querySelectorAll('.cell');
        const message = document.getElementById('message');
        const player1ScoreDisplay = document.getElementById('player1-score');
        const player2ScoreDisplay = document.getElementById('player2-score');

        function startGame() {
            const player1Input = document.getElementById('player1');
            const player2Input = document.getElementById('player2');
            
            player1Name = player1Input.value || "Player 1";
            player2Name = player2Input.value || "Player 2";

            const playerNamesDiv = document.getElementById('player-names');
            const gameBoard = document.getElementById('game-board');

            player1Input.style.display = 'none';
            player2Input.style.display = 'none';
            playerNamesDiv.querySelector('button').style.display = 'none';

            gameBoard.style.display = 'grid';

            gameActive = true;
            message.textContent = `${player1Name}'s turn`;
        }

        function restartGame() {
            for (const cell of cells) {
                cell.textContent = '';
            }

            currentPlayer = 1;
            gameActive = true;
            message.textContent = `${player1Name}'s turn`;
            document.getElementById('restart-button').style.display = 'none';
        }

        function checkWin() {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const combo of winningCombos) {
                const [a, b, c] = combo;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    gameActive = false;
                    document.getElementById('restart-button').style.display = 'block';
                    if (currentPlayer === 1) {
                        player1Score++;
                        player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
                        message.textContent = `${player1Name} wins!`;
                    } else {
                        player2Score++;
                        player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
                        message.textContent = `${player2Name} wins!`;
                    }
                }
            }

            if (Array.from(cells).every(cell => cell.textContent)) {
                gameActive = false;
                message.textContent = "It's a draw!";
                document.getElementById('restart-button').style.display = 'block';
            }
        }

        function handleCellClick(cell) {
            if (!gameActive || cell.textContent) return;

            cell.textContent = currentPlayer === 1 ? 'X' : 'O';
            checkWin();
            currentPlayer = 3 - currentPlayer; // Toggle between 1 and 2
            message.textContent = currentPlayer === 1 ? `${player1Name}'s turn` : `${player2Name}'s turn`;
        }

        for (const cell of cells) {
            cell.addEventListener('click', () => handleCellClick(cell));
        }
    </script>
</body>
</html>
