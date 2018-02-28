import axios from 'axios';
import pluralize from 'pluralize';
import capitalize from 'capitalize';
import {toggleConfirmationModal} from '../confirmation';

function createUpdate(base, config) {
  const {getURL, wrapRequest} = base;
  const {toaster} = config;

  return function (options) {
    const updateOptions = {
      entityMethod: 'update',
      ...options
    };

    const {
      data,
      params = {},
      headers = {},
      entity,
      entityMethod,
      hastoaster = true,
      confirmation = false,
      toasterText
    } = updateOptions;

    const url = getURL(updateOptions);
    const entityItem = pluralize.singular(entity);

    return dispatch => {
      let $promiseResolve;
      let $promiseReject;

      const $promise = new Promise((resolve, reject) => {
        $promiseResolve = resolve;
        $promiseReject = reject;
      });

      const isNotEntityUpdate = entityMethod !== 'update';

      const confirm = () => {
        const request = axios.put(url, data, {headers, params});

        return wrapRequest({...updateOptions, dispatch, request})
          .then(() => {
            if (toaster && hastoaster) {
              toaster.show({
                type: 'success',
                title: 'Updated Successfully',
                text: toasterText || `${capitalize(entityItem)} has been updated`
              });
            }
          })
          .then($promiseResolve)
          .catch($promiseReject);
      };

      if (confirmation) {
        dispatch(toggleConfirmationModal({
          title: confirmation.title || 'Update',
          text: confirmation.text || `update this ${entityItem}${isNotEntityUpdate ? ` ${entityMethod}` : ''}`,
          hint: confirmation.hint,
          question: confirmation.question,
          color: confirmation.color || 'success',
          confirmText: confirmation.btnTxt || 'Yes, update',
          confirm
        }));
      } else {
        confirm();
      }

      return $promise;
    };
  };
}

export default createUpdate;
