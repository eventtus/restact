import axios from 'axios';
import {getURL, wrapRequest} from '../base';

function get(options) {
  const getOptions = {
    entityMethod: options.collection ? 'all' : 'get',
    ...options
  };

  const {
    params = {}, headers = {}
  } = getOptions;

  const url = getURL(getOptions);

  return dispatch => {
    const request = axios.get(url, {headers, params})
      .then(response => {
        const {
          'x-total-pages': totalPages,
          'x-total': total,
          'x-page': page
        } = response.headers;

        const value = {
          ...response,
          total,
          hasMore: Number(totalPages) > Number(page)
        };

        return value;
      });

    return wrapRequest({...getOptions, dispatch, request});
  };
}

export default get;
