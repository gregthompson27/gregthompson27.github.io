(function(window, _) {
  window.no = window.no || {
    numz: {},
    phyz: {
      /**
       * Returns an Object with basic properties utilized in a 
       * 2D physics system. On top of simple physical properties,
       * the body has template methods handleCollision() and update().
       * 
       * @param {String} type: A String, should be unique to your
       * system, representing the type of body.
       * @param {Object} options.
       * @param {Number} options.velocityX: The body's velocity on the x axis.
       * @param {Number} options.velocityY: The body's velocity on the y axis.
       * @param {Number} options.rotationalVelocity: The body's rotational velocity.
       * @param {Number} options.integrity: The body's integrity. 0 means the 
       * body is no longer intact and should explode or break apart, 1 means 
       * the body is fully intact.
       * @param {Number} options.density: The density of the body, can be 
       * used when calculating the force of impact of a collision, which can 
       * then be distributed to affect the kinetic energy of the colliding bodies.
       * @param {Number} options.volatility: The body's volatility, how unstable or
       * explosive it may be. Can be used as a multiplyer when calculating the 
       * force of impact of a collision.
       * @return {Object}
       */
      makeBody: function(type, {
        velocityX = 0,
        velocityY = 0,
        rotationalVelocity = 0,
        integrity = 1,
        density = 1,
        volatility = 0
      } = {}) {
        if (type === undefined) throw new Error('You must provide a valid String for the type parameter!');
        return {
          type: type,
          velocityX: velocityX,
          velocityY: velocityY,
          rotationalVelocity: rotationalVelocity,
          integrity: integrity,
          density: density,
          volatility: volatility,

          /**
           * @param {Number} A number representing the force of the impact.
           * @param {Object} The other body involved in the collision.
           */
          handleCollision(impact, body) {
            // template method //
          },

          /**
           * Can be overridden in the concrete body to provide a custom update()
           * method.
           */
          update(event) {
            // template method //
          }
        };
      },
      /**
       * 
       * @param {number} pointA : point with properties x and y
       * @param {number} pointB : another point with properties x and y
      // * @param {number} pointA.x ???
      //  * @param {number} pointB.x 
      //  * @param {number} pointA.y
       // * @param {number} pointB.y
      
       * @returns {number} distance - the distance b/w pointA and pointB
       */
      calculateDistance: function(pointA, pointB){
        const distanceX = pointB.x - pointA.x;
        const distanceY = pointB.y - pointA.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        return distance;
      },

      /**
       * Using the Pythagorean Theorem, returns the distance in pixels between 
       * two points.
       * 
       * @param {Object} pointA: A point with properties x and y.
       * @param {Object} pointB: A point with properties x and y.
       * @return {Number}: The distance in pixels between pointA and pointB.
       */
      getDistance(pointA, pointB) {
        const
          distanceX = Math.abs(pointB.x - pointA.x),
          distanceY = Math.abs(pointB.y - pointA.y);
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      }
    },
  };
}(window, window._));
