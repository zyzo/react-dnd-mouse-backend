'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MouseBackend = require('./MouseBackend');

var _MouseBackend2 = _interopRequireDefault(_MouseBackend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMouseBackend = function createMouseBackend(manager) {
  return new _MouseBackend2.default(manager);
};

exports.default = createMouseBackend;