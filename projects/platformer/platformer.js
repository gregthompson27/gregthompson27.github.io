$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms
    createPlatform(150 + 25, 620, 150, 20); // First platform near the bottom
    createPlatform(425 + 25, 510, 150, 20); // Second platform higher and to the right
    createPlatform(700 + 25, 400, 150, 20); // Third platform even higher and further right
    // Top platform higher and to the left
    createPlatform(150 + 25, 180, 150, 20);

    // TODO 3 - Create Collectables
    createCollectable("diamond", 475 + 25, 400, 0.125, 1); // First collectable on the first platform

    // TODO 4 - Create Cannons

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  // Function to execute user input
  window.executeFunction = function (inputId) {
    const userInput = document.getElementById(inputId).value.trim();
    try {
      // Evaluate the user input as JavaScript code
      eval(userInput);
      alert("Function executed successfully!");
    } catch (error) {
      alert("Error: Invalid function call. Please check your syntax.");
    }
  };

  registerSetup(setup);
});
