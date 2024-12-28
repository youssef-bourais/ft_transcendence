 import { startGame } from './game.js';

export function loadGameFront() {
    const app = document.getElementById('goma');	
    app.innerHTML = `
    <div class="game-container">
    <div class="canvas-section">
        <div class="controls">
            <button id="btn-1v1">1 vs 1</button>
            <button id="btn-1vAI">1 vs AI</button>
            <button id="btn-4player">4 Players</button>
        </div>
        <canvas id="gameCanvas"></canvas>
    </div>
    <div class="customization-section">
        <div class="customization">
            <h3>Game Customization</h3>
            <table>
                <tr>
                    <td>Ball Speed:</td>
                    <td><input type="number" id="BALL_SPEED" value="5"></td>
                </tr>
                <tr>
                    <td>Paddle Speed:</td>
                    <td><input type="number" id="PADDLE_SPEED" value="5"></td>
                </tr>
                <tr>
                    <td>Winning Score (1 -> 10):</td>
                    <td><input type="number" id="WINNING_SCORE" value="5"></td>
                </tr>
            </table>
            <button onclick="applySettings()">Apply Settings</button>
        </div>
        <div class="instructions">
            <p>Player 1 (Left): W/S</p>
            <p>Player 2 (Right): ↑/↓</p>
            <p>Player 3 (Top): A/D</p>
            <p>Player 4 (Bottom): ←/→</p>
        </div>
    </div>
</div>
    `;
    console.log('Game front loaded');

    document.getElementById('btn-1v1').addEventListener('click', () => startGame('1v1'));
    document.getElementById('btn-1vAI').addEventListener('click', () => startGame('1vAI'));
    document.getElementById('btn-4player').addEventListener('click', () => startGame('4player'));
}