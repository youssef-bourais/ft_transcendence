
export function loadGameFront() {
    const app = document.getElementById('goma');	
    app.innerHTML = `
          <div class="game-container">
            <div class="canvas-section">
                <div class="controls">
                    <button onclick="game = startGame('1v1')">1 vs 1</button>
                    <button onclick="game = startGame('1vAI')">1 vs AI</button>
                    <button onclick="game = startGame('4player')">4 Players</button>
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

                <div class="theme-selection">
                    <h3>Select Game Theme</h3>
                    <table>
                        <tr>
                            <td>Background Color:</td>
                            <td>
                                <select id="backgroundColor">
                                    <option value="black">Black</option>
                                    <option value="blue">Blue</option>
                                    <option value="green">Green</option>
                                    <option value="red">Red</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Paddle Color:</td>
                            <td>
                                <select id="paddleColor">
                                    <option value="white">White</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="cyan">Cyan</option>
                                    <option value="magenta">Magenta</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Ball Color:</td>
                            <td>
                                <select id="ballColor">
                                    <option value="white">White</option>
                                    <option value="orange">Orange</option>
                                    <option value="purple">Purple</option>
                                    <option value="pink">Pink</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <button onclick="applyTheme()">Apply Theme</button>
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

    // Setup the game page
    setupGamePage();
}




const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 15;
let BALL_SPEED = 3;
let PADDLE_SPEED = 20;
let WINNING_SCORE = 20;
let GAME_MODE = '1v1';

// const tutorials = {
//     '1v1': 'This is a 1v1 game mode. Use W/S for Player 1 and Up/Down for Player 2.',
//     '1vAI': 'This is a 1vAI game mode. Use W/S for Player 1 and the AI will control Player 2.',
//     '4player': 'This is a 4 player game mode. Use W/S for Player 1, Up/Down for Player 2, A/D for Player 3, and Left/Right for Player 4.'
// }


// KeyboardController class
class KeyboardController {
    constructor() {
        this.keys = {
            w: false,
            s: false,
            up: false,
            down: false,
            a: false,
            d: false,
            left: false,
            right: false
        };

        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        switch(e.key.toLowerCase()) {
            case 'w': this.keys.w = true; break;
            case 's': this.keys.s = true; break;
            case 'arrowup': this.keys.up = true; break;
            case 'arrowdown': this.keys.down = true; break;
            case 'a': this.keys.a = true; break;
            case 'd': this.keys.d = true; break;
            case 'arrowleft': this.keys.left = true; break;
            case 'arrowright': this.keys.right = true; break;
        }
    }

    handleKeyUp(e) {
        switch(e.key.toLowerCase()) {
            case 'w': this.keys.w = false; break;
            case 's': this.keys.s = false; break;
            case 'arrowup': this.keys.up = false; break;
            case 'arrowdown': this.keys.down = false; break;
            case 'a': this.keys.a = false; break;
            case 'd': this.keys.d = false; break;
            case 'arrowleft': this.keys.left = false; break;
            case 'arrowright': this.keys.right = false; break;
        }
    }
}


// Ball class
class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT / 2;
        if (Math.random() < 0.5) {
            this.dx = BALL_SPEED * 1;
        } else {
            this.dx = -BALL_SPEED * -1;
        }
        this.dy = BALL_SPEED * (Math.random() * 2 - 1);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off top and bottom
        if (this.y < 0 || this.y > CANVAS_HEIGHT) {
            this.dy *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x - BALL_SIZE/2, this.y - BALL_SIZE/2, BALL_SIZE, BALL_SIZE);
    }
}



// Paddle class
class Paddle {
    constructor(x, y, orientation = 'vertical', isAI = false) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.score = 0;
        this.isAI = isAI;
    }

    update(ball, upKey, downKey) {
        if (this.isAI) {
            this.updateAI(ball);
        } else {
            if (this.orientation === 'vertical') {
                if (upKey && this.y > PADDLE_HEIGHT/2) {
                    this.y -= PADDLE_SPEED;
                }
                if (downKey && this.y < CANVAS_HEIGHT - PADDLE_HEIGHT/2) {
                    this.y += PADDLE_SPEED;
                }
            } else {
                if (upKey && this.x > PADDLE_HEIGHT/2) {
                    this.x -= PADDLE_SPEED;
                }
                if (downKey && this.x < CANVAS_WIDTH - PADDLE_HEIGHT/2) {
                    this.x += PADDLE_SPEED;
                }
            }
        }
    }

    updateAI(ball) {
        // Simple AI: Follow the ball with a slight delay
        const targetY = ball.y;
        if (Math.abs(this.y - targetY) > PADDLE_HEIGHT/4) {
            if (this.y < targetY) {
                this.y += PADDLE_SPEED * 1;
            } else {
                this.y -= PADDLE_SPEED * 1;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        if (this.orientation === 'vertical') {
            ctx.fillRect(this.x - PADDLE_WIDTH/2, this.y - PADDLE_HEIGHT/2, PADDLE_WIDTH, PADDLE_HEIGHT);
        } else {
            ctx.fillRect(this.x - PADDLE_HEIGHT/2, this.y - PADDLE_WIDTH/2, PADDLE_HEIGHT, PADDLE_WIDTH);
        }
    }
}


// Game class && logic
class Game {
    constructor(mode = '1v1') {
        this.mode = mode;
        this.ball = new Ball();
        this.paddles = [];
        this.setupPaddles();
        this.gameOver = false;
    }

    setupPaddles() {
        if (this.mode === '1v1') {
            GAME_MODE = '1v1';
            this.paddles = [
                new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'),
                new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical')
            ];
        } else if (this.mode === '1vAI') {
            GAME_MODE = '1vAI';
            this.paddles = [
                new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'),
                new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical', true)
            ];
        } else if (this.mode === '4player') {
            GAME_MODE = '4player';
            this.paddles = [
                new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'), // Left
                new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2, 'vertical'), // Right
                new Paddle(CANVAS_WIDTH / 2, PADDLE_WIDTH * 2, 'horizontal'), // Top
                new Paddle(CANVAS_WIDTH / 2, CANVAS_HEIGHT - PADDLE_WIDTH * 2, 'horizontal') // Bottom
            ];
        }
    }

    updateGameSettings(settings) {
    
        BALL_SPEED = settings.BALL_SPEED;
        PADDLE_SPEED = settings.PADDLE_SPEED;
        WINNING_SCORE = settings.WINNING_SCORE;
    }

    update(keys) {
        if (this.gameOver) return;

        this.ball.update();
        
        if (this.mode === '1v1') {
            this.paddles[0].update(this.ball, keys.w, keys.s);
            this.paddles[1].update(this.ball, keys.up, keys.down);
        } else if (this.mode === '1vAI') {
            this.paddles[0].update(this.ball, keys.w, keys.s);
            this.paddles[1].update(this.ball);
        } else if (this.mode === '4player') {
            this.paddles[0].update(this.ball, keys.w, keys.s); // Left paddle
            this.paddles[1].update(this.ball, keys.up, keys.down); // Right paddle
            this.paddles[2].update(this.ball, keys.a, keys.d); // Top paddle
            this.paddles[3].update(this.ball, keys.left, keys.right); // Bottom paddle
        }

        this.checkCollisions();
        this.checkScore();
    }

    checkCollisions() {
        this.paddles.forEach(paddle => {
            if (paddle.orientation === 'vertical') {
                if (this.ball.x > paddle.x - PADDLE_WIDTH/2 &&
                    this.ball.x < paddle.x + PADDLE_WIDTH/2 &&
                    this.ball.y > paddle.y - PADDLE_HEIGHT/2 &&
                    this.ball.y < paddle.y + PADDLE_HEIGHT/2) {
                    this.ball.dx *= -1.1;
                    this.ball.dy += (this.ball.y - paddle.y) * 0.1;
                }
            } else {
                if (this.ball.x > paddle.x - PADDLE_HEIGHT/2 &&
                    this.ball.x < paddle.x + PADDLE_HEIGHT/2 &&
                    this.ball.y > paddle.y - PADDLE_WIDTH/2 &&
                    this.ball.y < paddle.y + PADDLE_WIDTH/2) {
                    this.ball.dy *= -1.1;
                    this.ball.dx += (this.ball.x - paddle.x) * 0.1;
                }
            }
        });
    }

    checkScore() {
        if (this.mode === '4player') {
            if (this.ball.y < 0) {
                this.paddles[3].score++; // Bottom player scores
                this.ball.reset();
            } else if (this.ball.y > CANVAS_HEIGHT) {
                this.paddles[2].score++; // Top player scores
                this.ball.reset();
            } else if (this.ball.x < 0) {
                this.paddles[1].score++; // Right player scores
                this.ball.reset();
            } else if (this.ball.x > CANVAS_WIDTH) {
                this.paddles[0].score++; // Left player scores
                this.ball.reset();
            }
        } else {
            if (this.ball.x < 0) {
                this.paddles[1].score++;
                this.ball.reset();
            } else if (this.ball.x > CANVAS_WIDTH) {
                this.paddles[0].score++;
                this.ball.reset();
            }
        }

        this.paddles.forEach(paddle => {
            if (paddle.score >= WINNING_SCORE) {
                this.gameOver = true;
            }
        });
    }

    testBackground(CANVAS_HEIGHT, CANVAS_WIDTH, ctx, theme) {
    
    // Create image objects
    const p1 = new Image();
    const p2 = new Image();
    const p3 = new Image();
    const p4 = new Image();

    // Set image sources
    p1.src = './themes/1.png'; // Replace with your image paths
    p2.src = './themes/2.png'; 
    p3.src = './themes/3.png'; 
    p4.src = './themes/4.png'; 

    // Wait until all images are loaded before drawing them
    let imagesLoaded = 0;
    const images = [p1, p2, p3, p4];
    
    // Increment imageLoaded for each image when it's loaded
    images.forEach((img, index) => {
        img.onload = () => {
            imagesLoaded++;
            // Check if all images are loaded
            if (imagesLoaded === images.length) {
                // All images are loaded, now draw them on the canvas
                ctx.drawImage(p1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw base layer
                ctx.drawImage(p2, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw middle layer
                ctx.drawImage(p3, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw top layer
                ctx.drawImage(p4, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Draw another top layer
            }
        };
        img.onerror = () => console.error(`Error loading image: ${img.src}`);
    });
}

    
    // Call the function to test it    


    draw(ctx) {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Draw center lines
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.moveTo(CANVAS_WIDTH / 2, 0);
        ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
        ctx.moveTo(0, CANVAS_HEIGHT / 2);
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        //this.testBackground(CANVAS_HEIGHT, CANVAS_WIDTH, ctx);

        // Draw game elements
        this.ball.draw(ctx);
        this.paddles.forEach(paddle => paddle.draw(ctx)); 

        // Draw scores
        ctx.font = '32px Arial';
        ctx.fillStyle = '#fff';
        if (this.mode === '4player') {
            // Left player score
            ctx.fillText(this.paddles[0].score, CANVAS_WIDTH/4, CANVAS_HEIGHT/2);
            // Right player score
            ctx.fillText(this.paddles[1].score, 3*CANVAS_WIDTH/4, CANVAS_HEIGHT/2);
            // Top player score
            ctx.fillText(this.paddles[2].score, CANVAS_WIDTH/2, CANVAS_HEIGHT/4);
            // Bottom player score
            ctx.fillText(this.paddles[3].score, CANVAS_WIDTH/2, 3*CANVAS_HEIGHT/4);
        } else {
            ctx.fillText(this.paddles[0].score, CANVAS_WIDTH/4, 50);
            ctx.fillText(this.paddles[1].score, 3*CANVAS_WIDTH/4, 50);
        }

        if (this.gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = '#fff';
            ctx.font = '48px Arial';
            ctx.fillText('Game Over!', CANVAS_WIDTH/2 - 100, CANVAS_HEIGHT/2);
        }

    }
}

// Game loop

function setupGamePage(mode) {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    let game = null;
    const keyboard = new KeyboardController();

    window.startGame = (mode) => {
        game = new Game(mode);
        gameLoop();
    };

    function gameLoop() {
        if (game) {
            game.update(keyboard.keys);
            game.draw(ctx);
        }
        requestAnimationFrame(gameLoop);
    }

    // window.updateGameSettings = (settings) => {
    //     if (game) {
    //         game.updateGameSettings(settings);
    //     }
    // };
}

function applySettings() {
    const ballSpeed = document.getElementById('BALL_SPEED').value;
    const paddleSpeed = document.getElementById('PADDLE_SPEED').value;
    const winningScore = document.getElementById('WINNING_SCORE').value;
    
    window.gameSettings = {
        BALL_SPEED: parseInt(ballSpeed),
        PADDLE_SPEED: parseInt(paddleSpeed),
        WINNING_SCORE: parseInt(winningScore)
    };
    // if(game) {
    //     updateGameSettings(window.gameSettings);
    // }
}

