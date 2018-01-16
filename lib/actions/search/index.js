'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSearch(base) {
  var getURL = base.getURL,
      wrapRequest = base.wrapRequest;

  var cancellation = {};

  return function (options) {
    var searchOptions = _extends({
      entityMethod: 'search'
    }, options);

    var params = searchOptions.params,
        entity = searchOptions.entity,
        actionType = searchOptions.actionType;

    var url = getURL(searchOptions);

    return function (dispatch) {
      if (cancellation[actionType]) {
        cancellation[actionType]('Another search for the ' + entity + ' entity just started');
      }

      var request = _axios2.default.get(url, {
        params: params,
        cancelToken: new _axios2.default.CancelToken(function (c) {
          cancellation[actionType] = c;
        })
      }).then(function (response) {
        var _response$headers = response.headers,
            totalPages = _response$headers['x-total-pages'],
            total = _response$headers['x-total'],
            page = _response$headers['x-page'];


        var value = _extends({}, response, {
          total: total,
          hasMore: Number(totalPages) > Number(page)
        });

        return value;
      });

      return wrapRequest(_extends({}, searchOptions, { dispatch: dispatch, request: request }));
    };
  };
}

exports.default = createSearch;
module.exports = exports['default'];