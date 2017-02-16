import u from 'util';

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