'use strict';

var _ = require('./10.modules-1');

var lib = _interopRequireWildcard(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//OR import lib from 'lib';
console.log(lib.square(11)); // 121
console.log(lib.diag(4, 3)); // 5