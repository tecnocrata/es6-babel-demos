"use strict";

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Person {
    constructor(name) {
        this.name = name;
    }
}
function* jsRocksIsAwesome() {
    yield "JS Rocks is Awesome";
    yield "JS Rocks says JavaScript Rocks";
    return "because JavaScript really rocks";
}

var jsRocks = jsRocksIsAwesome();

console.log(jsRocks.next());
console.log(jsRocks.next());
console.log(jsRocks.next());

var enrique = new Person('Enrique');
console.log(enrique.name);