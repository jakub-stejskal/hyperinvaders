/**
  Canvas-based view - draws game state
 */
function SvgView(element, drawMode) {
  this.element = element;
  this.width = Constants.width;
  this.height = Constants.height;
  this.drawFunction = this._createDrawFunction(drawMode || "squares");
  this.ns = "http://www.w3.org/2000/svg";

  this.elements = {};
}

/**
  Creates DOM element and attaches it to document
 */
SvgView.prototype.display = function() {
  this.canvas = document.createElementNS(this.ns, "svg");
  this.canvas.setAttribute("width", "100%");
  this.canvas.setAttribute("height", "100%");
  this.canvas.setAttribute("viewBox","0 0 600 600");

  this.element.empty();
  this.element.prepend(this.canvas);
};

/**
  Removes DOM element from document
 */
SvgView.prototype.hide = function() {
  this.element.empty();
};

/**
  Redraws each entity according to game state
 */
SvgView.prototype.draw = function() {
  this.game.forEachEntity(this.drawFunction);
};

/**
  Resets view into initial state
 */
SvgView.prototype.reset = function() {
  this.elements = {};
  while (this.canvas.lastChild) {
    this.canvas.removeChild(this.canvas.lastChild);
  }
};

/**
  Writes out big (by default centered) text
 */
SvgView.prototype.writeText = function(text, x, y) {
  x = x || this.width / 2;
  y = y || this.height / 2;
  shape = document.createElementNS(this.ns, "text");
  shape.setAttribute("x", x);
  shape.setAttribute("y", y);
  shape.setAttribute("font-size", "32px");
  shape.setAttribute("font-family", "Geo");
  shape.setAttribute("fill", "white");
  shape.setAttribute("text-anchor", "middle");
  shape.appendChild(document.createTextNode(text));
  this.canvas.appendChild(shape);
};

/**
  Creates drawing function which is called on every entity upon redrawing
 */
SvgView.prototype._createDrawFunction = function(drawMode) {
  var view = this;
  switch (drawMode) {
    case "squares":
    return function () {
      if (this.hasChanged) {
        view._drawRect(this.x, this.y, this.width, this.height, this.getAppearence("color"), this.getId());
      }
    };
    case "chars":
    return function () {
      if (this.hasChanged) {
        view._drawChars(this.x, this.y, this.width, this.height, this.getAppearence("chars"), this.getId());
      }
    };
    case "both":
    return function () {
      if (this.hasChanged) {
        view._drawRect(this.x, this.y, this.width, this.height, this.getAppearence("color"), this.getId());
        view._drawChars(this.x, this.y, this.width, this.height, this.getAppearence("chars"), this.getId());
      }
    };
  }
};

SvgView.prototype._drawRect = function(x, y, width, height, color, id) {
  if (color !== "") {
    var shape = this.elements['rect' + id];
    if (!shape) {
      shape = document.createElementNS(this.ns, "rect");
      shape.setAttribute("width", width);
      shape.setAttribute("height", height);
      this.elements['rect' + id] = shape;
    }
    shape.setAttribute("x", x);
    shape.setAttribute("y", y);
    shape.setAttribute("fill", color);
    console.log(shape);
    this.canvas.appendChild(shape);
  }
};

SvgView.prototype._drawChars = function(x, y, width, height, chars, id) {
  var shape = this.elements['text' + id];
  if (!shape) {
    shape = document.createElementNS(this.ns, "text");
    shape.setAttribute("font-size", "32px");
    shape.setAttribute("font-family", "Invaders");
    shape.setAttribute("fill", "white");
    shape.appendChild(document.createTextNode(chars));
    this.elements['text' + id] = shape;
  }
  shape.setAttribute("x", x);
  shape.setAttribute("y", y + height);
  shape.childNodes[0].nodeValue = chars;
  this.canvas.appendChild(shape);
};
