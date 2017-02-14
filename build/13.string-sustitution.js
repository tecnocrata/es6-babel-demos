"use strict";

var _templateObject = _taggedTemplateLiteral(["that ", " is a ", ""], ["that ", " is a ", ""]),
    _templateObject2 = _taggedTemplateLiteral(["", "", "", "!"], ["", "", "", "!"]),
    _templateObject3 = _taggedTemplateLiteral(["", " ", "!"], ["", " ", "!"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Simple string substitution
var name = "Enrique";
console.log("Yo, " + name + "!");

var a = 10;
var b = 10;
console.log("JavaScript first appeared " + (a + b) + " years ago. Crazy!");
//=> JavaScript first appeared 20 years ago. Crazy!

console.log("The number of JS MVC frameworks is " + 2 * (a + b) + " and not " + 10 * (a + b) + ".");
//=> The number of JS frameworks is 40 and not 200.

function fn() {
  return "I am a result of a function";
}
console.log("foo " + fn() + " !!!");
//=> foo I am a result of a function !!!

//tagged templates
var person = 'Enrique';
var age = 28;

function myTag(strings, personExp, ageExp) {

  var str0 = strings[0]; // "that "
  var str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  var ageStr;
  if (ageExp > 99) {
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  return str0 + personExp + str1 + ageStr;
}

var output = myTag(_templateObject, person, age);

console.log(output);
//=> that Enrique is a youngster


function template(strings) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function (key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

var t1Closure = template(_templateObject2, 0, 1, 0);
//console.log (t1Closure);
console.log(t1Closure('Y', 'A'));
//=> "YAY!"
var t2Closure = template(_templateObject3, 0, 'foo');
//console.log (t2Closure);
console.log(t2Closure('Hello', { foo: 'World' }));
//=> "Hello World!"