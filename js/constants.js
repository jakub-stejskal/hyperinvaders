var Constants = {};

Constants.unit = 32;
Constants.width = 600;
Constants.height = 600;
Constants.leftBoundary = 2 * Constants.unit;
Constants.rightBoundary = Constants.width - 2 * Constants.unit;
Constants.bottomBoundary = Constants.height - 1 * Constants.unit;

Constants.fps = 60;
Constants.cooldown = Constants.fps / 2;

Constants.keybinding = {
    player: {
      LEFT: 37,
      RIGHT: 39,
      SHOOT: 38
    },
    PAUSE: 80,
    MUTE: 77,
    RESET: 82
  };
