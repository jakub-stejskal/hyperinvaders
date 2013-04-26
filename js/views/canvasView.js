/**
	Canvas-based view - draws game state
 */
function CanvasView(element, drawMode) {
	this.element = element;
	this.width = Constants.width;
	this.height = Constants.height;
	this.drawFunction = this._createDrawFunction(drawMode || "squares");
}

/**
	Creates DOM element and attaches it to document
 */
CanvasView.prototype.display = function() {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.context = this.canvas.getContext("2d");

	this.element.empty();
	this.element.prepend(this.canvas);
};

/**
	Removes DOM element from document
 */
CanvasView.prototype.hide = function() {
  this.element.empty();
};

/**
	Redraws each entity according to game state
 */
CanvasView.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);

	this.game.forEachEntity(this.drawFunction);
};

/**
	Resets view into initial state
 */
CanvasView.prototype.reset = function() {
	this.context.clearRect(0, 0, this.width, this.height);
};

/**
	Writes out big (by default centered) text
 */
CanvasView.prototype.writeText = function(text, x, y) {
	x = x || this.width / 2;
	y = y || this.height / 2;
	this.context.fillStyle = "white";
	this.context.textAlign = "center";
	this.context.font = 32 + 'px Geo';
	this.context.fillText(text, x, y);
};

/**
	Creates drawing function which is called on every entity upon redrawing
 */
CanvasView.prototype._createDrawFunction = function(drawMode) {
	var view = this;
	switch (drawMode) {
		case "squares":
		return function () {
			view._drawRect(this.x, this.y, this.width, this.height, this.getAppearence("color"));
		};
		case "chars":
		return function () {
			view._drawChars(this.x, this.y, this.width, this.height, this.getAppearence("chars"));
		};
		case "both": {
			return function () {
				view._drawRect(this.x, this.y, this.width, this.height, this.getAppearence("color"));
				view._drawChars(this.x, this.y, this.width, this.height, this.getAppearence("chars"));
			};
		}
	}
};

CanvasView.prototype._drawRect = function(x, y, width, height, color) {
	if (color !== "") {
		this.context.fillStyle = color;
		this.context.fillRect(x, y, width, height);
	}
};

CanvasView.prototype._drawChars = function(x, y, width, height, chars) {
	this.context.fillStyle = "white";
	this.context.textAlign = "center";
	this.context.textBaseline = "middle";
	this.context.font = 32 + 'px Invaders';
	this.context.fillText(chars, x + width / 2, y + height / 2);
};
