"use strict";

class Rectangle {
  constructor() {
    this.width = 4;
  }

  //static myStaticValue =0;
}

Rectangle.myStaticValue = 100;

let r1 = new Rectangle();
console.log(Rectangle.myStaticValue);
let r2 = new Rectangle();
console.log(Rectangle.myStaticValue);