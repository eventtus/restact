function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import axios from 'axios';
import objectPath from 'object-path';
import config from '../../constants/config';

function createBase() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : config,
      toastr = _ref.toastr,
      loading = _ref.loading,
      entities = _ref.entities,
      API_URL = _ref.url;

  var loadingStart = function loadingStart(dispatch) {
    return loading ? dispatch(loading.show()) : dispatch;
  };
  var loadingComplete = function loadingComplete(dispatch) {
    return loading ? dispatch(loading.hide()) : dispatch;
  };

  function getURL(_ref2) {
    var entity = _ref2.entity,
        entityMethod = _ref2.entityMethod,
        _ref2$entityParams = _ref2.entityParams,
        entityParams = _ref2$entityParams === undefined ? {} : _ref2$entityParams,
        _ref2$entityUrl = _ref2.entityUrl,
        entityUrl = _ref2$entityUrl === undefined ? API_URL : _ref2$entityUrl;

    return entityUrl + entities[entity][entityMethod](entityParams);
  }

  function wrapRequest(config) {
    var dispatch = config.dispatch,
        request = config.request,
        requestConfig = _objectWithoutProperties(config, ['dispatch', 'request']);

    var actionType = requestConfig.actionType,
        params = requestConfig.params,
        onSuccess = requestConfig.onSuccess,
        _requestConfig$hasLoa = requestConfig.hasLoader,
        hasLoader = _requestConfig$hasLoa === undefined ? true : _requestConfig$hasLoa;


    if (hasLoader) loadingStart(dispatch);

    request.then(onSuccess).then(function () {
      return loadingComplete(dispatch);
    }).catch(function (thrown) {
      var message = objectPath.get(thrown, ['response', 'headers', 'x-error'], thrown.message);

      if (hasLoader) loadingComplete(dispatch);

      if (!axios.isCancel(thrown) && toastr) {
        toastr.show({
          type: 'error',
          title: 'Error',
          text: message,
          options: {
            timeout: 5000,
            attention: true
          }
        });
      }
    });

    if (actionType) {
      request.then(function (_ref3) {
        var data = _ref3.data,
            headers = _ref3.headers,
            config = _ref3.config;
        return dispatch({
          type: actionType,
          data: data,
          headers: headers,
          config: config,
          params: params,
          requestConfig: requestConfig
        });
      });
    }

    return request;
  }

  return {
    getURL: getURL,
    wrapRequest: wrapRequest
  };
}

export default createBase;