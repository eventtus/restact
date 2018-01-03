import R from 'ramda';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import entities from 'Constants/entities';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

const start = dispatch => dispatch(showLoading());
const complete = dispatch => dispatch(hideLoading());

function getURL({entity, entityMethod, entityParams = {}, entityUrl = API_URL}) {
  return entityUrl + entities[entity][entityMethod](entityParams);
}

function wrapRequest(config) {
  const {dispatch, request, ...requestConfig} = config;
  const {actionType, params, noLoader, onSuccess} = requestConfig;

  if (!noLoader) start(dispatch);

  request
    .then(onSuccess)
    .then(R.partial(complete, [dispatch]))
    .catch(thrown => {
      const message = R.pathOr(thrown.message, ['response', 'headers', 'x-error'], thrown);

      if (!noLoader) complete(dispatch);
      if (!axios.isCancel(thrown)) {
        toastr.error('Error', message, {
          timeout: 5000,
          attention: true
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

export {getURL, wrapRequest};
