"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleDate = function () {
  var _years = new WeakMap();
  var _months = new WeakMap();
  var _days = new WeakMap();

  var SimpleDate = function () {
    function SimpleDate(year, month, day) {
      _classCallCheck(this, SimpleDate);

      // Check that (year, month, day) is a valid date
      // ...

      // If it is, use it to initialize "this" date
      _years.set(this, year);
      _months.set(this, month);
      _days.set(this, day);
    }

    _createClass(SimpleDate, [{
      key: "addDays",
      value: function addDays(nDays) {
        // Increase "this" date by n days
        // ...
      }
    }, {
      key: "getDay",
      value: function getDay() {
        return _days.get(this);
      }
    }]);

    return SimpleDate;
  }();

  return SimpleDate;
}();

var x = new SimpleDate(2017, 2, 3);
console.log(x.getDay());