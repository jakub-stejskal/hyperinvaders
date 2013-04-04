var Levels = {
  first: {
    enemies: function(pubsub) {
      var enemies = [];
      for (var row = 0; row < 5; row++) {
        for (var col = 2; col < 14; col++) {
          enemies.push(new Enemy(col, row).init(pubsub));
        }
      }
      return enemies;
    }
  }
};

Levels.initializeEnemies = function(level, pubsub) {
  return Levels[level].enemies(pubsub);
};
