'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*// ES5
function B() {}
//Static method simulated in ES5
B.f = function () {};

function D() {}
D.prototype = Object.create(B.prototype);

D.f(); // error*/

// ES6
var B = function () {
  function B() {
    _classCallCheck(this, B);
  }

  _createClass(B, null, [{
    key: 'f',
    value: function f() {
      console.log('Hi there');
    }
  }]);

  return B;
}();

var D = function (_B) {
  _inherits(D, _B);

  function D() {
    _classCallCheck(this, D);

    return _possibleConstructorReturn(this, (D.__proto__ || Object.getPrototypeOf(D)).apply(this, arguments));
  }

  return D;
}(B);

D.f(); // ok