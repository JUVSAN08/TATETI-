document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('background-music');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    const cells = document.querySelectorAll('.cell');
    const winnerPopup = document.getElementById('winner-popup');
    const winnerMessage = document.getElementById('winner-message');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);

    // Play background music
    backgroundMusic.play();

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        if (gameBoard[index] || checkWinner()) return;

        // Play click sound
        clickSound.currentTime = 0;
        clickSound.play();

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            // Play win sound
            winSound.currentTime = 0;
            winSound.play();
            showWinnerPopup(currentPlayer);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function showWinnerPopup(winner) {
        winnerMessage.textContent = `¡El ganador es ${winner}!`;
        winnerPopup.style.display = 'flex';
    }

    function closePopup() {
        winnerPopup.style.display = 'none';
        resetGame();
    }

    function resetGame() {
        gameBoard = Array(9).fill(null);
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        winnerPopup.style.display = 'none';
    }

    window.resetGame = resetGame;
    window.closePopup = closePopup;
});
