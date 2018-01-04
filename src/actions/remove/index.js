import axios from 'axios';
import pluralize from 'pluralize';
import capitalize from 'capitalize';
import {toggleConfirmationModal} from '../confirmation';

function createRemove(base, config) {
  const {getURL, wrapRequest} = base;
  const {showToastr} = config;

  return function (options) {
    const deleteOptions = {
      entityMethod: 'delete',
      ...options
    };

    const {
      params,
      entity,
      entityMethod,
      isBulk = false,
      hasToastr = true,
      confirmation = {
        text: '',
        hint: '',
        question: '',
        color: '',
        title: '',
        btnTxt: '',
        cancelBtnTxt: ''
      }
    } = deleteOptions;

    const url = getURL(deleteOptions);
    const entityItem = pluralize.singular(entity);

    return dispatch => {
      let $promiseResolve;
      let $promiseReject;

      const $promise = new Promise((resolve, reject) => {
        $promiseResolve = resolve;
        $promiseReject = reject;
      });

      const isNotEntityDelete = entityMethod !== 'delete';

      const confirm = () => {
        const request = axios.delete(url, {params});
        const wrappedRequest = wrapRequest({...deleteOptions, dispatch, request});

        wrappedRequest
          .then(response => {
            const {data} = response;

            if (isBulk && data && (data.deleted || data.failed)) {
              if (data.deleted.count) {
                showToastr({
                  type: 'success',
                  title: `${data.deleted.count} Removed Successfully`
                });
              }

              if (data.failed.count) {
                showToastr({
                  type: 'error',
                  title: `${data.failed.count} Failed to remove`,
                  text: data.failed.message
                });
              }
            } else if (hasToastr) {
              showToastr({
                type: 'success',
                title: 'Removed Successfully',
                text: `${capitalize(entityItem)}${isNotEntityDelete ? ` ${entityMethod}` : ''} ${isBulk ? 'have' : 'has'} been removed`
              });
            }

            return response;
          })
          .then($promiseResolve)
          .catch($promiseReject);

        return wrappedRequest;
      };

      if (confirmation) {
        dispatch(toggleConfirmationModal({
          title: confirmation.title || (isBulk ? 'Bulk Delete' : 'Delete'),
          text: confirmation.text || `delete ${isBulk ? 'these' : 'this'} ${entityItem}${isNotEntityDelete ? ` ${entityMethod}` : ''}`,
          hint: confirmation.hint,
          question: confirmation.question,
          color: confirmation.color || 'danger',
          confirmText: confirmation.btnTxt || 'Yes, Delete',
          cancelText: confirmation.cancelBtnTxt || 'Cancel',
          confirm
        }));
      } else {
        confirm();
      }

      return $promise;
    };
  };
}

export default createRemove;
