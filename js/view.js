var View = function(element, drawMode) {
	this.element = element || document.body;
	this.width = Constants.width;
	this.height = Constants.height;
	this.drawFunction = this.createDrawFunction(drawMode || "squares");
};

View.prototype.display = function() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.context = this.canvas.getContext("2d");

	this.element.appendChild(this.canvas);
};

View.prototype.createDrawFunction = function(drawMode) {
	var view = this;
	switch (drawMode) {
		case "squares":
			return function () {
				view.drawRect(this.x, this.y, this.width, this.height, this.getAppearence("color"));
			};
		case "chars":
			return function () {
				view.drawChars(this.x, this.y, this.width, this.height, this.getAppearence("chars"));
			};
		case "both": {
			return function () {
				view.drawRect(this.x, this.y, this.width, this.height, this.getAppearence("color"));
				view.drawChars(this.x, this.y, this.width, this.height, this.getAppearence("chars"));
			};
		}
	}
};

View.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);

	this.game.forEachEntity(this.drawFunction);
};

View.prototype.drawRect = function(x, y, width, height, color) {
	this.context.fillStyle = color;
  this.context.fillRect(x, y, width, height);
};

View.prototype.drawChars = function(x, y, width, height, chars) {
	this.context.fillStyle = "white";
	this.context.textAlign = "center";
	this.context.textBaseline = "middle";
	this.context.font = 32 + 'px Invaders';
  this.context.fillText(chars, x + width / 2, y + height / 2);
};

View.prototype.writeText = function(text, x, y) {
	x = x || this.width / 2;
	y = y || this.height / 2;
	this.context.fillStyle = "white";
	this.context.textAlign = "center";
	this.context.font = 32 + 'px Geo';
	this.context.fillText(text, x, y);
};
