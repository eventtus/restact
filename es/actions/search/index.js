var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import axios from 'axios';

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

      var request = axios.get(url, {
        params: params,
        cancelToken: new axios.CancelToken(function (c) {
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

export default createSearch;