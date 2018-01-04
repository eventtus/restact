import axios from 'axios';
import objectPath from 'object-path';
import config from '../../constants/config';

function createBase({toastr, loading, entities, url: API_URL} = config) {
  const loadingStart = dispatch => loading ? dispatch(loading.show()) : dispatch;
  const loadingComplete = dispatch => loading ? dispatch(loading.hide()) : dispatch;

  function getURL({entity, entityMethod, entityParams = {}, entityUrl = API_URL}) {
    return entityUrl + entities[entity][entityMethod](entityParams);
  }

  function wrapRequest(config) {
    const {dispatch, request, ...requestConfig} = config;
    const {actionType, params, onSuccess, hasLoader = true} = requestConfig;

    if (hasLoader) loadingStart(dispatch);

    request
      .then(onSuccess)
      .then(() => loadingComplete(dispatch))
      .catch(thrown => {
        const message = objectPath.get(thrown, ['response', 'headers', 'x-error'], thrown.message);

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
      request.then(({data, headers, config}) => dispatch({
        type: actionType,
        data,
        headers,
        config,
        params,
        requestConfig
      }));
    }

    return request;
  }

  return {
    getURL,
    wrapRequest
  };
}

export default createBase;
