"use strict";

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [jsRocksIsAwesome].map(regeneratorRuntime.mark);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
};

function jsRocksIsAwesome() {
    return regeneratorRuntime.wrap(function jsRocksIsAwesome$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return "JS Rocks is Awesome";

                case 2:
                    _context.next = 4;
                    return "JS Rocks says JavaScript Rocks";

                case 4:
                    return _context.abrupt("return", "because JavaScript really rocks");

                case 5:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

var jsRocks = jsRocksIsAwesome();

console.log(jsRocks.next());
console.log(jsRocks.next());
console.log(jsRocks.next());

var enrique = new Person('Enrique');
console.log(enrique.name);