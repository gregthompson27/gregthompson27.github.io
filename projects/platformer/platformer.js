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

    const option0 = {
      platforms: [
        [175, 620, 150, 20, "limegreen"], // bottom platform on the left
        [450, 510, 150, 20, "limegreen"], // second platform in the middle
        [725, 400, 150, 20, "limegreen"], // third platform on the right
        [175, 180, 150, 20, "limegreen"], // very top platform on the left
        [175, 620, 20, 120, "limegreen"], // vertical bottom left platform to hide a collectable behind
      ],
      collectables: [
        ["diamond", 500, 400, 0.125, 1],
        ["database", 240, 650, 0.0625, 1.015625],
      ],
      cannons: [], // No cannons
    };

    const option1 = {
      platforms: [
        [425, 190, 50, 550, "hotpink"], // Vertical platform in middle that can't be jumped over
        [0, 365, 200, 20, "hotpink"], // Platform on left to prevent falling
        [300, 490, 300, 20, "hotpink"], // Middle-height platform that spans left and right side of wall
        [450, 240, 120, 20, "hotpink"], // high platform just to right of wall
        [700, 365, 200, 20, "hotpink"], // Higher platform on the far right
        [50, 620, 100, 20, "hotpink"], // platform on the bottom left
        [750, 620, 100, 20, "hotpink"], // platform on the bottom right
      ],
      collectables: [
        ["diamond", 435, 100, 0.05, 1],
        ["grace", 75, 650, 0.125, 1],
      ],
      cannons: [], // No cannons
    };

    const option2 = {
      platforms: [
        // four platforms across the bottom, all with a width of 30
        [62.5, 600, 30, 15, "red"],
        [310, 600, 30, 15, "red"],
        [560, 600, 30, 15, "red"],
        [812.5, 600, 30, 15, "red"],
        // one platform on the far right, above the bottom row to jump up to
        [870, 480, 30, 15, "red"],
        // [50, 150, 150, 20, "red"], // Platform near spawn point
        // three platforms across the top, all with a width of 30
        [210, 360, 30, 15, "red"],
        // [460, 360, 30, 15, "red"],
        [712.5, 360, 30, 15, "red"],
      ],
      collectables: [
        ["steve", 550, 560, 0, 0],
        ["diamond", 700, 300, 0.1, 1],
        ["grace", 205, 80, 0.2, 1], // Collectable near spawn platform
      ],
      cannons: [
        // ["right", 675, 200]
      ], // No cannons
    };

    const options = [option0, option1, option2];
    // const randomIndex = 3; // Change to Math.floor(Math.random() * options.length) for random selection
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];

    // TODO 2 - Create Platforms
    randomOption.platforms.forEach((platform) => {
      createPlatform(...platform);
    });

    // TODO 3 - Create Collectables
    randomOption.collectables.forEach((collectable) => {
      createCollectable(...collectable);
    });

    // TODO 4 - Create Cannons
    randomOption.cannons.forEach((cannon) => {
      createCannon(...cannon);
    });

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
