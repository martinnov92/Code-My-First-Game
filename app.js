(function() {
    // "global" vars for this game
    var canvas = document.getElementById('gameCanvas');
    var canvasContext = canvas.getContext('2d');

    // ball vars
    var ballX = 50;
    var ballY = 50;
    var ballSpeedX = 10;
    var ballSpeedY = 5;

    // paddle
    var paddle1Y = 250;
    var paddle2Y = 250;

    var player1Score = 0;
    var player2Score = 0;

    // CONSTS
    const PADDLE_WIDTH = 10;
    const PADDLE_HEIGHT = 100;

    // set black background for game
    colorRect(0, 0, canvas.width, canvas.height, '#000');

    // listen for mouse move
    canvas.addEventListener('mousemove', function(e) {
        var mousePos = calculateMousePos(e);
        // set paddle1Y to center of the paddle
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });

    // setInterval as frames per seconds
    var framesPerSecond = 30;
    setInterval(function() {
        move();
        draw();
        // console.log(ballX, ballY);
    }, 1000 / framesPerSecond);

    function calculateMousePos(e) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;

        // where on the page from the sides is the element and how far we scrolled
        var mouseX = e.clientX - rect.left - root.scrollLeft;
        var mouseY = e.clientY - rect.top - root.scrollTop;

        return {
            x: mouseX,
            y: mouseY
        };
    }

    function computerMovement() {
        // simple AI
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
        if (paddle2YCenter < ballY - 35) {
            paddle2Y += 6;
        } else if (paddle2YCenter > ballY + 35){
            paddle2Y -= 6;
        }
    }

    // separate move function from draw function
    function move() {
        computerMovement();

        // move ball
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;

        // bounce from the right
        if (ballX > canvas.width) {
            if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)) {
                ballSpeedX = -ballSpeedX;
            } else {
                ballReset();
                player1Score++;
            }
        }
        
        // bounce from the left
        if (ballX < 0) {
            if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)) {
                ballSpeedX = -ballSpeedX;
            } else {
                ballReset();
                player2Score++;
            }
        }

        // bounce from the bottom
        if (ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
    
        // bounce from the top
        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
    }

    // draw functions
    function draw() {
        // next line blanks out the screen with black
        colorRect(0, 0, canvas.width, canvas.height, '#000');

        // draw paddle (left side)
        colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#fff');

        // draw paddle (right side)
        colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#fff');

        // draws the ball
        colorCircle(ballX, ballY, 10, '#fff');

        // score
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }

    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }

    // make a cicle function
    function colorCircle(centerX, centerY, radius, color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        // to draw a cirlce, ballX is center of the ball, 10 is radius
        // 0 and Math.PI * 2 -> radians
        // true -> clockwise or counterwise (false)
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    function ballReset() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
})();