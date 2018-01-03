import axios from 'axios';
import {getURL, wrapRequest} from '../base';

const cancellation = {};

function search(options) {
  const searchOptions = {
    entityMethod: 'search',
    ...options
  };

  const {params, entity, actionType} = searchOptions;
  const url = getURL(searchOptions);

  return dispatch => {
    if (cancellation[actionType]) {
      cancellation[actionType](`Another search for the ${entity} entity just started`);
    }

    const request = axios.get(url, {
      params,
      cancelToken: new axios.CancelToken(c => {
        cancellation[actionType] = c;
      })
    })
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

    return wrapRequest({...searchOptions, dispatch, request});
  };
}

export default search;
