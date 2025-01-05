#!/bin/zsh

IP_ADDRESS=$(ipconfig getifaddr en0)
sed -i '' "s|^MACHINE_URL=.*|MACHINE_URL=$IP_ADDRESS|" .env
echo "MACHINE_URL has been set to $IP_ADDRESS"
docker-compose down && docker-compose build --no-cache && docker-compose up



# resetGame() {
#         // Reset gameOver state
#         this.gameOver = false;
#         // thisgameOver = false;
    
#         // Reset ball position and speed
#         this.ball.reset();
    
#         // Reset paddle positions and scores
#         this.paddles.forEach((paddle, index) => {
#             paddle.score = 0;
#             if (paddle.orientation === 'vertical') {
#                 paddle.y = CANVAS_HEIGHT / 2; // Reset vertical paddles to center
#             } else {
#                 paddle.x = CANVAS_WIDTH / 2; // Reset horizontal paddles to center
#             }
#         });
        
#         // cancelAnimationFrame();
#         // Reset animation frame and other game states
#         // if (animationFrameId) {
#             cancelAnimationFrame();
#         //     animationFrameId = null; // Clear the ID
#         // }
#     }