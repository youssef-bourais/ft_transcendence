
import {loadTournament } from './tournamentHtml.js'
import {intilizeNameImage2} from "./app.js"
import {startTournament} from './app.js'

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 20;
let BALL_SPEED = 8;
let PADDLE_SPEED = 12;
let WINNING_SCORE = 5;
let GAME_MODE = '1v1';
let animationFrameId = null;

export let gameOver = false;
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
// JavaScript
class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        // Always in the vertical center
        this.y = CANVAS_HEIGHT / 2;

        // Randomly choose left or right side
        if (Math.random() < 0.5) {
            this.x = BALL_SIZE * 2;
            this.dx = BALL_SPEED; // move right
        } else {
            this.x = CANVAS_WIDTH - BALL_SIZE * 2;
            this.dx = -BALL_SPEED; // move left
        }

        // Give a random vertical component
        this.dy = (Math.random() - 0.5) * BALL_SPEED;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.y < 0 || this.y > CANVAS_HEIGHT) {
            this.dy *= -1;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_SIZE / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
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
                this.y += PADDLE_SPEED * 0.8;
            } else {
                this.y -= PADDLE_SPEED * 0.8;
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
export class Game {
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
  
    gameStop() {
        this.gameOver = true;
        gameOver = true;
       
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
            cancelAnimationFrame(animationFrameId); 
            
            if(localStorage.getItem("gameEnd") == "start")
            {
                localStorage.setItem("gameEnd", "end")
                setTimeout(() => update(), 1000);
                this.gameStop()
            }
            
            // alert("hiii")
        }

    }
}

function update () {
    let con = document.getElementById("con");
    con.innerHTML =   loadTournament();
    setTimeout(() => returnTournament(), 100);
}
function returnTournament() {
    let containeStartGame = document.getElementsByClassName("containeStartGame")[0];
    containeStartGame.style.display = "flex";
    startTournament();
    

    intilizeNameImage2()
}

export function startGame(mode) {
    const game = new Game(mode);
    setupGamePage(game);
}


export function setupGamePage(game) {
    console.log('Game page loaded');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const keyboard = new KeyboardController();

    function gameLoop() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        if (game) {
            console.log("ball speed zbi =====", BALL_SPEED);
            game.update(keyboard.keys);
            game.draw(ctx);
        }
       animationFrameId =  requestAnimationFrame(gameLoop);
    }
    gameLoop();
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
    if(game) {
        updateGameSettings(window.gameSettings);
    }
}
