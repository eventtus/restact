import axios from 'axios';
import pluralize from 'pluralize';
import capitalize from 'capitalize';

function createCreate(base, config) {
  const {getURL, wrapRequest} = base;
  const {toaster} = config;

  return function (options) {
    const createOptions = {
      entityMethod: 'create',
      ...options
    };

    const {
      data,
      entity,
      headers = {},
      hastoaster = true
    } = createOptions;

    const url = getURL(createOptions);
    const entityItem = pluralize.singular(entity);

    return dispatch => {
      const request = axios.post(url, data, {headers});

      return wrapRequest({...createOptions, dispatch, request})
        .then(({data: responseData}) => {
          if (toaster && hastoaster) {
            toaster.show({
              type: 'success',
              title: 'Added Successfully',
              text: `${capitalize(entityItem)} has been added`
            });
          }

          return responseData;
        });
    };
  };
}

export default createCreate;
