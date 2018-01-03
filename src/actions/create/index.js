import axios from 'axios';
import pluralize from 'pluralize';
import {toastr} from 'react-redux-toastr';
import {capitalize} from 'Utils/string';
import {getURL, wrapRequest} from '../base';

function create(options) {
  const createOptions = {
    entityMethod: 'create',
    ...options
  };

  const {data, headers = {}, entity, hasToastr = true} = createOptions;
  const url = getURL(createOptions);
  const entityItem = pluralize.singular(entity);

  return dispatch => {
    const request = axios.post(url, data, {headers});

    return wrapRequest({...createOptions, dispatch, request})
      .then(({data: responseData}) => {
        if (hasToastr) {
          toastr.success('Added Successfully', `${capitalize(entityItem)} has been added`);
        }

        return responseData;
      });
  };
}

export default create;
