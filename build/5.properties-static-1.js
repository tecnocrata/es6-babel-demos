"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function Rectangle() {
  _classCallCheck(this, Rectangle);

  this.width = 4;
}

//static myStaticValue =0;
;

Rectangle.myStaticValue = 100;

var r1 = new Rectangle();
console.log(Rectangle.myStaticValue);
var r2 = new Rectangle();
console.log(Rectangle.myStaticValue);