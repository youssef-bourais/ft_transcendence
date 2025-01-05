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

// Add reset function for scores
function resetScores() {
    score1 = 0;
    score2 = 0;
}

let score1 = 0;
let score2 = 0;
let animationFrameId = null;

class KeyboardController {
    constructor() {
        this.keys = { w: false, s: false, up: false, down: false, space: false };
        this.boundKeyDown = this.handleKeyDown.bind(this);
        this.boundKeyUp = this.handleKeyUp.bind(this);
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('keydown', this.boundKeyDown);
        document.addEventListener('keyup', this.boundKeyUp);
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.boundKeyDown);
        document.removeEventListener('keyup', this.boundKeyUp);
    }

    handleKeyDown(e) {
        switch (e.key.toLowerCase()) {
            case 'w': this.keys.w = true; break;
            case 's': this.keys.s = true; break;
            case 'arrowup': this.keys.up = true; break;
            case 'arrowdown': this.keys.down = true; break;
            case ' ': this.keys.space = true; break;
        }
        // Prevent scrolling when using arrow keys
        if(['ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        switch (e.key.toLowerCase()) {
            case 'w': this.keys.w = false; break;
            case 's': this.keys.s = false; break;
            case 'arrowup': this.keys.up = false; break;
            case 'arrowdown': this.keys.down = false; break;
            case ' ': this.keys.space = false; break;
        }
    }
}

class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = CANVAS_WIDTH / 2;  // Start from center
        this.y = CANVAS_HEIGHT / 2;
        
        // Random initial direction with normalized speed
        const angle = (Math.random() * Math.PI / 2) - Math.PI / 4; // -45 to 45 degrees
        this.dx = Math.cos(angle) * BALL_SPEED * (Math.random() < 0.5 ? 1 : -1);
        this.dy = Math.sin(angle) * BALL_SPEED;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        
        // Bounce off top and bottom with small random factor
        if (this.y <= BALL_SIZE/2 || this.y >= CANVAS_HEIGHT - BALL_SIZE/2) {
            this.dy *= -1;
            this.dy += (Math.random() - 0.5) * 0.5; // Add slight randomness
            this.y = Math.max(BALL_SIZE/2, Math.min(this.y, CANVAS_HEIGHT - BALL_SIZE/2));
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, BALL_SIZE / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }
}

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = PADDLE_WIDTH;
        this.height = PADDLE_HEIGHT;
    }

    update(upKey, downKey) {
        const newY = this.y + (downKey ? PADDLE_SPEED : 0) - (upKey ? PADDLE_SPEED : 0);
        if (newY >= this.height/2 && newY <= CANVAS_HEIGHT - this.height/2) {
            this.y = newY;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(
            this.x - this.width/2,
            this.y - this.height/2,
            this.width,
            this.height
        );
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = new KeyboardController();
        this.reset();
    }

    reset() {
        this.ball = new Ball();
        this.paddles = [
            new Paddle(PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2),
            new Paddle(CANVAS_WIDTH - PADDLE_WIDTH * 2, CANVAS_HEIGHT / 2)
        ];
        this.gameOver = false;
        resetScores();
    }

    update() {
        if (this.gameOver) {
            if (this.keyboard.keys.space) {
                this.reset();
                return;
            }
        }

        this.ball.update();
        this.paddles[0].update(this.keyboard.keys.w, this.keyboard.keys.s);
        this.paddles[1].update(this.keyboard.keys.up, this.keyboard.keys.down);

        this.checkCollisions();
        this.checkScore();
    }

    checkCollisions() {
        this.paddles.forEach((paddle, index) => {
            if (
                this.ball.x >= paddle.x - paddle.width/2 &&
                this.ball.x <= paddle.x + paddle.width/2 &&
                this.ball.y >= paddle.y - paddle.height/2 &&
                this.ball.y <= paddle.y + paddle.height/2
            ) {
                // Reverse ball direction and adjust angle based on hit position
                this.ball.dx *= -1.1; // Slight speed increase on hits
                const hitPos = (this.ball.y - paddle.y) / (paddle.height/2);
                this.ball.dy = hitPos * BALL_SPEED;
                
                // Move ball outside paddle to prevent multiple collisions
                this.ball.x = index === 0 ? 
                    paddle.x + paddle.width/2 + BALL_SIZE/2 : 
                    paddle.x - paddle.width/2 - BALL_SIZE/2;
            }
        });
    }

    checkScore() {
        if (this.ball.x < 0) {
            score2 += 1;
            this.ball.reset();
        } else if (this.ball.x > CANVAS_WIDTH) {
            score1 += 1;
            this.ball.reset();
        }

        if (score1 >= WINNING_SCORE || score2 >= WINNING_SCORE) {
            this.gameOver = true;
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw center line
        this.ctx.setLineDash([10, 10]);
        this.ctx.beginPath();
        this.ctx.moveTo(CANVAS_WIDTH/2, 0);
        this.ctx.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
        this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Draw game elements
        this.ball.draw(this.ctx);
        this.paddles.forEach(paddle => paddle.draw(this.ctx));

        // Draw scores
        this.ctx.font = '48px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(score1, CANVAS_WIDTH/4, 60);
        this.ctx.fillText(score2, 3*CANVAS_WIDTH/4, 60);

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '48px Arial';
            const winner = score1 >= WINNING_SCORE ? 'Player 1 Wins!' : 'Player 2 Wins!';
            this.ctx.fillText(winner, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
            this.ctx.font = '24px Arial';
            //this.cleanup();
            if(localStorage.getItem("gameEnd") == "start")
            {   
                localStorage.setItem("gameEnd", "end")
                if(localStorage.getItem("game1") == "start")
                    localStorage.setItem("game1", "end")
                else if(localStorage.getItem("game2") == "start")
                    localStorage.setItem("game2", "end")
                else if(localStorage.getItem("game3") == "start")
                    localStorage.setItem("game3", "end")
                    
                // else if()
                setTimeout(() => updateMy(), 1000);
            }
        }
    }

    cleanup() {
        this.keyboard.removeEventListeners();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }
}




function updateMy () {
    let con = document.getElementById("con");
    con.innerHTML =   loadTournament();
    setTimeout(() => returnTournament(), 100);
}


function returnTournament() {
    if(localStorage.getItem("game3") != "end")
    {
        let containeStartGame = document.getElementsByClassName("containeStartGame")[0];
        containeStartGame.style.display = "flex";
    }
    startTournament();
    

    intilizeNameImage2()
}








export function startGameTournament() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const game = new Game(canvas);

    function gameLoop() {
        game.update();
        game.draw();
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    gameLoop();

    // Return cleanup function
    return () => game.cleanup();
}