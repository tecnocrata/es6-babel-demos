"use strict";

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
  function Rectangle() {
    _classCallCheck(this, Rectangle);
  }

  _createClass(Rectangle, [{
    key: "width",
    set: function set(w) {
      this._width = w;
    },
    get: function get() {
      return this._width;
    }
  }, {
    key: "height",
    set: function set(h) {
      this._height = h;
    },
    get: function get() {
      return this._height;
    }
  }]);

  return Rectangle;
}();

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

var Square = function (_Rectangle) {
  _inherits(Square, _Rectangle);

  function Square() {
    _classCallCheck(this, Square);

    return _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).apply(this, arguments));
  }

  _createClass(Square, [{
    key: "width",
    set: function set(w) {
      _set(Square.prototype.__proto__ || Object.getPrototypeOf(Square.prototype), "width", w, this);

      // Maintain square-ness
      _set(Square.prototype.__proto__ || Object.getPrototypeOf(Square.prototype), "height", w, this);
    }
  }, {
    key: "height",
    set: function set(h) {
      _set(Square.prototype.__proto__ || Object.getPrototypeOf(Square.prototype), "height", h, this);

      // Maintain square-ness
      _set(Square.prototype.__proto__ || Object.getPrototypeOf(Square.prototype), "width", h, this);
    }
  }]);

  return Square;
}(Rectangle);

// But can a rectangle be substituted by a square?


f(new Square()); // error