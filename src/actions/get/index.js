import axios from 'axios';

function createGet(base) {
  const {getURL, wrapRequest} = base;

  return function (options) {
    const getOptions = {
      entityMethod: options.collection ? 'all' : 'get',
      ...options
    };

    const {
      params = {},
      headers = {}
    } = getOptions;

    const url = getURL(getOptions);

    return dispatch => {
      const request = axios.get(url, {headers, params})
        .then(response => {
          const {
            'x-page': page,
            'x-total': total,
            'x-total-pages': totalPages
          } = response.headers;

          const hasMore = Number(totalPages) > Number(page);

          return {
            ...response,
            total,
            hasMore
          };
        });

      return wrapRequest({...getOptions, dispatch, request});
    };
  };
}

export default createGet;
