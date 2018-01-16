'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCreate(base, config) {
  var getURL = base.getURL,
      wrapRequest = base.wrapRequest;
  var toastr = config.toastr;


  return function (options) {
    var createOptions = _extends({
      entityMethod: 'create'
    }, options);

    var data = createOptions.data,
        entity = createOptions.entity,
        _createOptions$header = createOptions.headers,
        headers = _createOptions$header === undefined ? {} : _createOptions$header,
        _createOptions$hasToa = createOptions.hasToastr,
        hasToastr = _createOptions$hasToa === undefined ? true : _createOptions$hasToa;


    var url = getURL(createOptions);
    var entityItem = _pluralize2.default.singular(entity);

    return function (dispatch) {
      var request = _axios2.default.post(url, data, { headers: headers });

      return wrapRequest(_extends({}, createOptions, { dispatch: dispatch, request: request })).then(function (_ref) {
        var responseData = _ref.data;

        if (toastr && hasToastr) {
          toastr.show({
            type: 'success',
            title: 'Added Successfully',
            text: (0, _capitalize2.default)(entityItem) + ' has been added'
          });
        }

        return responseData;
      });
    };
  };
}

exports.default = createCreate;
module.exports = exports['default'];