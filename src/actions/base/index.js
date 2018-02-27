// @flow
import axios from 'axios';
import objectPath from 'object-path';
import type {BaseConfigType, WrapConfigType, UrlOptionsType} from 'Types/config';

const defaultBaseConfig: BaseConfigType = {
  url: '',
  entities: {},
  includeToaster: false,
  includeLoading: false
};

function createBase(baseConfig: BaseConfigType = defaultBaseConfig) {
  const {
    toaster,
    loading,
    entities,
    url: API_URL
  } = baseConfig;

  const loadingStart = dispatch => loading ? dispatch(loading.show()) : dispatch;
  const loadingComplete = dispatch => loading ? dispatch(loading.hide()) : dispatch;

  function getURL(urlOptions: UrlOptionsType) {
    const {entity, entityMethod, entityParams = {}, entityUrl = API_URL} = urlOptions;

    return entityUrl + entities[entity][entityMethod](entityParams);
  }

  function wrapRequest(wrapConfig: WrapConfigType) {
    const {
      actionType,
      dispatch,
      request,
      hasLoader = true,
      onSuccess,
      ...requestConfig
    } = wrapConfig;

    const {params} = requestConfig;

    if (hasLoader) loadingStart(dispatch);

    request
      .then(onSuccess)
      .then(() => loadingComplete(dispatch))
      .catch(thrown => {
        const message = objectPath.get(thrown, ['response', 'headers', 'x-error'], thrown.message);

        if (hasLoader) loadingComplete(dispatch);

        if (!axios.isCancel(thrown) && toaster) {
          toaster.show({
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
