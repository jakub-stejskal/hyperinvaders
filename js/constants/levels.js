/**
  Provides enemies for given level
  There is currently only one level
 */
var Levels = {
  first: {
    enemies: function(pubsub) {
      var enemies = [];
      for (var row = 0; row < 5; row++) {
        var type;
        if (row === 0) type = 1;
        else if (row > 0 && row <= 2) type = 2;
        else type = 3;

        for (var col = 2; col < 14; col++) {
          enemies.push(new Enemy(col, row, type).init(pubsub));
        }
      }
      return enemies;
    }
  }
};

/**
  Initializes enemies for given level
 */
Levels.initializeEnemies = function(level, pubsub) {
  return Levels[level].enemies(pubsub);
};
