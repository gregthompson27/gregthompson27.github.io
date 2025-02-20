/*
 * TODO 4: Create a modularized index.js,
 * pass in window and createjs
 */
(function (window, createjs) {
  // TODO 5: Initialize CreateJS //
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  // TODO 6: Set the framerate of the Ticker
  createjs.Ticker.framerate = 60;

  /*
   * TODO 7:CREATE AND CONFIGURE ANY DISPLAY
   * OBJECTS AND ADD THEM TO THE DISPLAY LIST HERE
   */

  // INIT CREATEJS //
  const eyesContainer = new createjs.Container();
  // const smileContainer =

  // CREATE A BACKGROUND //
  const background = new createjs.Shape();
  background.graphics
    .beginFill("#FA0")
    .drawRect(0, 0, canvas.width, canvas.height);

  // CREATE A CIRCLE //
  const circle = new createjs.Shape();
  circle.graphics.beginFill("blue").drawCircle(0, 0, 25);

  eyesContainer.x = canvas.width * 0.5;
  eyesContainer.y = 80;

  const rect = new createjs.Shape();
  rect.graphics.beginFill("red").drawRect(-60, 50, 120, 10);

  // ADD DISPLAY OBJECTS TO STAGE //
  eyesContainer.addChild(circle, rect);
  stage.addChild(background, eyesContainer);

  stage.update();

  // TODO 8: Listen to the 'tick' event  //
  let tickHandler = createjs.Ticker.on("tick", onTick);

  // TODO 9: Handle the 'tick' event //
  function onTick(event) {
    update(event);
  }

  /*
   * TODO 10: Implement an update Function, after making
   * changes to assets, it must call stage.update();
   */
  const maxScale = 2;
  const minScale = 0.5;
  let scaleSpeed = 0.01;

  function update(event) {
    // circle.x++;
    // eyesContainer.y++;
    circle.scaleX += scaleSpeed;

    if (circle.scaleX >= maxScale || circle.scaleX <= minScale) {
      scaleSpeed *= -1;
    }

    stage.update();
  }
})(window, window.createjs);
