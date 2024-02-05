/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var $board = $('#board');
  var boardWidth = $board.width();
  var boardHeight = $board.height();
  var walkerWidth = $('#walker').width();
  const personWidth = walkerWidth;

  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  };
  
  

  // Game Item Objects
  function GameObject(posX, posY, id) {
    var obj = {};
    obj.speedX = 0;
    obj.speedY = 0;
    obj.positionX = posX;
    obj.positionY = posY;
    obj.id = id;
    return obj;
  }

  var walker = GameObject(25, 25, '#walker');
  var crawler = GameObject(300, 300, '#crawler');


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                         // change 'eventType' to the type of event you want to handle













  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveWalker(walker);
    moveWalker(crawler);
    redrawWalker(walker);
    redrawWalker(crawler);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.ENTER) {
      console.log('You pressed the enter key!!');
    } else if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      crawler.speedX = 5;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      crawler.speedX = -5;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      crawler.speedY = -5;
    } else if (event.which === KEY.UP) {
      walker.speedY = -5;
      crawler.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0;
      crawler.speedX = 0;
    } else if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0;
      crawler.speedY = 0;
    }
  }













  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function moveWalker(person) {
    person.positionX += person.speedX;
    person.positionY += person.speedY;
    keepInBounds(person);
  }

  function keepInBounds(person) {
    if (person.positionX < 0) {
      person.positionX = 0;
    } else if (person.positionX + walkerWidth > boardWidth) {
      person.positionX = boardWidth - walkerWidth;
    }

    if (person.positionY < 0) {
      person.positionY = 0;
    } else if (person.positionY + personWidth > boardHeight) {
      person.positionY = boardHeight - personWidth;
    }

  }

  function redrawWalker(person) {
    $(person.id).css("left", person.positionX);
    $(person.id).css("top", person.positionY);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
