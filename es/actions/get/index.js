var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import axios from 'axios';

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
      var request = axios.get(url, { headers: headers, params: params }).then(function (response) {
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

export default createGet;