'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Employee = function () {
  function Employee(firstName, familyName) {
    _classCallCheck(this, Employee);

    this._firstName = firstName;
    this._familyName = familyName;
  }

  _createClass(Employee, [{
    key: 'getFullName',
    value: function getFullName() {
      return this._firstName + ' ' + this._familyName;
    }
  }]);

  return Employee;
}();

var Manager = function (_Employee) {
  _inherits(Manager, _Employee);

  function Manager(firstName, familyName) {
    _classCallCheck(this, Manager);

    var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this, firstName, familyName));

    _this._managedEmployees = [];
    return _this;
  }

  _createClass(Manager, [{
    key: 'addEmployee',
    value: function addEmployee(employee) {
      this._managedEmployees.push(employee);
    }
  }]);

  return Manager;
}(Employee);

var xy = new Manager('Enrique', 'Ortuno');
console.log(xy.getFullName());