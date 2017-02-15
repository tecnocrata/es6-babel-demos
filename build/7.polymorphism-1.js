"use strict";

class Rectangle {
  set width(w) {
    this._width = w;
  }

  get width() {
    return this._width;
  }

  set height(h) {
    this._height = h;
  }

  get height() {
    return this._height;
  }
}

// A function that operates on an instance of Rectangle
function f(rectangle) {
  rectangle.width = 5;
  rectangle.height = 4;

  // Verify expected result
  if (rectangle.width * rectangle.height !== 20) {
    throw new Error("Expected the rectangle's area (width * height) to be 20");
  }
}

// A square IS-A rectangle... right?
class Square extends Rectangle {
  set width(w) {
    super.width = w;

    // Maintain square-ness
    super.height = w;
  }

  set height(h) {
    super.height = h;

    // Maintain square-ness
    super.width = h;
  }
}

// But can a rectangle be substituted by a square?
f(new Square()); // error