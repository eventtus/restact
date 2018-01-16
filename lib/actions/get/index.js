'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGet(base) {
  var getURL = base.getURL,
      wrapRequest = base.wrapRequest;


  return function (options) {
    var getOptions = _extends({
      entityMethod: options.collection ? 'all' : 'get'
    }, options);

    var _getOptions$params = getOptions.params,
        params = _getOptions$params === undefined ? {} : _getOptions$params,
        _getOptions$headers = getOptions.headers,
        headers = _getOptions$headers === undefined ? {} : _getOptions$headers;


    var url = getURL(getOptions);

    return function (dispatch) {
      var request = _axios2.default.get(url, { headers: headers, params: params }).then(function (response) {
        var _response$headers = response.headers,
            page = _response$headers['x-page'],
            total = _response$headers['x-total'],
            totalPages = _response$headers['x-total-pages'];


        var hasMore = Number(totalPages) > Number(page);

        return _extends({}, response, {
          total: total,
          hasMore: hasMore
        });
      });

      return wrapRequest(_extends({}, getOptions, { dispatch: dispatch, request: request }));
    };
  };
}

exports.default = createGet;
module.exports = exports['default'];