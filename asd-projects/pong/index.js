/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  let frames = 0;

  const boardWidth = $('#board').width();
  const boardHeight = $('#board').height();  

  const KEYCODE = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    ESC: 27,
  };
  
  // Game Item Objects
  const ball = GameItem('#ball');

  const leftPaddle = GameItem('#left-paddle');
  const leftScoreObj = GameItem('#left-score');
  let leftPoints = 0;

  const rightPaddle = GameItem('#right-paddle');
  const rightScoreObj = GameItem('#right-score');
  let rightPoints = 0;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // update x and y properties of objects
    if (frames >= 120) {
      moveGameItem(ball);
    }
    moveGameItem(leftPaddle);
    moveGameItem(rightPaddle);

    keepInBounds(leftPaddle);
    keepInBounds(rightPaddle);

    // redraw objects in new positions
    redrawGameItem(ball);
    redrawGameItem(leftPaddle);
    redrawGameItem(rightPaddle);


    checkForBounce(ball);
    checkForScore(ball);
    frames++;
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    const keycode = event.which;
    console.log('key was pressed')
    if (keycode === KEYCODE.UP) movePaddleUp(rightPaddle)
    else if (keycode === KEYCODE.DOWN) movePaddleDown(rightPaddle)
    else if (keycode === KEYCODE.W) movePaddleUp(leftPaddle)
    else if (keycode === KEYCODE.S) movePaddleDown(leftPaddle)
    else if (keycode === KEYCODE.ESC) endGame();
  }

  function handleKeyUp(event) {
    const keycode = event.which;
    if (keycode === KEYCODE.UP || keycode === KEYCODE.DOWN) stopVerticalMovement(rightPaddle)
    else if (keycode === KEYCODE.W || keycode === KEYCODE.S) stopVerticalMovement(leftPaddle)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startBall() {
    ball.x = 210;
    ball.y= 210;
    $(ball.id).css({
      left: ball.x,
      top: ball.y,
    });
    ball.speedX = Math.round(Math.random() * 2 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = Math.round(Math.random() + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function checkForBounce(ball) {
    const ballDiameter = $(ball.id).width();
    const maxBallHeight = boardHeight - ballDiameter;
    if (ball.y < 0 || ball.y > maxBallHeight) ball.speedY *= -1
    // need to add check for bounce against paddles
  }

  function checkForScore(ball) {
    const maxBallWidth = boardWidth - ball.width;
    if (ball.x <= 0) {
      console.log('score for the right side!!');
      rightPoints++;
      frames = 0;
      startBall();
    }
    if (ball.x > maxBallWidth) {
      console.log('score for the left side!!');
      leftPoints++;
      frames = 0;
      startBall();
    }
  }

  function keepInBounds(paddle) {
    
    const maxPaddleHeight = boardHeight - paddle.height;
    if (paddle.y < 0) {
      paddle.y = 0;
    }
    if (paddle.y > maxPaddleHeight) {
      paddle.y = maxPaddleHeight;
    }
  }

  function moveGameItem(gameItem) {
    gameItem.x += gameItem.speedX;
    gameItem.y += gameItem.speedY;
  }

  function redrawGameItem(gameItem) {
    $(gameItem.id).css('left', gameItem.x);
    $(gameItem.id).css('top', gameItem.y);
  }

  function movePaddleUp(paddle) {
    paddle.speedY = -5;
  }

  function movePaddleDown(paddle) {
    paddle.speedY = 5;
  }

  function stopVerticalMovement(paddle) {
    paddle.speedY = 0;
  }

  function GameItem(id) {
    const $gameItem = $(id); // store jquery object

    const gameItem = {}; // create new instance
    gameItem.id = id;
    gameItem.x = parseFloat($gameItem.css('left'));
    gameItem.y = parseFloat($gameItem.css('top'));
    gameItem.width = $gameItem.width();
    gameItem.height = $gameItem.height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;

    return gameItem;
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
