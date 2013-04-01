var Levels = {
  first: {
    enemies: (function() {
      var enemies = [];
      for (var row = 0; row < 5; row++) {
        for (var col = 2; col < 14; col++) {
          enemies.push(new Enemy(col, row));
        }
      }
      return enemies;
    })()
  }
};

for (var levelName in Levels) {
   var level = Levels[levelName];
   level.enemyCount = level.enemies.length;
}

Levels.initializeEnemies = function(level) {
  return Levels[level].enemies;
};
