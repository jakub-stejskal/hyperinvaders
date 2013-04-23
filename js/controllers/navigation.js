/**
  Handles navigation on Cube
 */
function Navigation(pubsub) {
  this.pubsub = pubsub;
  this._init();
}

Navigation.prototype._init = function() {
 $("a[href^=#]").hover(
  function () {
    $("#cube").addClass("hover-"+ $(this).attr('class'));
  },
  function () {
    $("#cube").removeClass("hover-"+ $(this).attr('class'));
  }
  );

 this.pubsub.subscribe(Events.INPUT.PAUSE, function (isDown) {
  if (isDown) {
    current = window.location.hash.substr(1);
    window.location.hash = (current === "play") ? "game" :"play";
  }});

 $(window).on('hashchange', function() {
  this._navigate();
}.bind(this));

 this._navigate();
};

Navigation.prototype._navigate = function() {
  target = window.location.hash.substr(1);
  if (target === "play") {
    $("#cube").attr("class","rotate-game");
    $("body").addClass("playing");
    this.pubsub.publish(Events.PLAY, true);
  }
  else {
    $("body").removeClass("playing");
    $("#cube").attr("class","rotate-" + target);
    this.pubsub.publish(Events.PLAY, false);
  }
};
