'use strict';

/*// ES5
function B() {}
//Static method simulated in ES5
B.f = function () {};

function D() {}
D.prototype = Object.create(B.prototype);

D.f(); // error*/

// ES6
class B {
  static f() {
    console.log('Hi there');
  }
}

class D extends B {}

D.f(); // ok