'use strict';

exports.__esModule = true;
exports.default = createApi;

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createApi(config) {
  var base = (0, _base2.default)(config);

  return {
    get: (0, _get2.default)(base, config),
    search: (0, _search2.default)(base, config),
    update: (0, _update2.default)(base, config),
    create: (0, _create2.default)(base, config),
    remove: (0, _remove2.default)(base, config)
  };
}
module.exports = exports['default'];