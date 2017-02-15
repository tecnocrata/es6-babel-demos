"use strict";

let SimpleDate = function () {
  let _years = new WeakMap();
  let _months = new WeakMap();
  let _days = new WeakMap();

  class SimpleDate {
    constructor(year, month, day) {
      // Check that (year, month, day) is a valid date
      // ...

      // If it is, use it to initialize "this" date
      _years.set(this, year);
      _months.set(this, month);
      _days.set(this, day);
    }

    addDays(nDays) {
      // Increase "this" date by n days
      // ...
    }

    getDay() {
      return _days.get(this);
    }
  }

  return SimpleDate;
}();

let x = new SimpleDate(2017, 2, 3);
console.log(x.getDay());