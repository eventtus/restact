import axios from 'axios';
import pluralize from 'pluralize';
import {toastr} from 'react-redux-toastr';
import {toggleConfirmationModal} from 'Actions/modals';
import {capitalize} from 'Utils/string';
import {getURL, wrapRequest} from '../base';

function remove(options) {
  const deleteOptions = {
    entityMethod: 'delete',
    ...options
  };

  const {
    params, entity, entityMethod,
    hasConfirmation = true, hasToastr = true, isBulk = false,
    confirmationText, confirmationHint, confirmationQuestion, confirmationTitle,
    confirmationBtnTxt, cancelBtnTxt
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
    const modalText = confirmationText || `delete ${isBulk ? 'these' : 'this'} ${entityItem}${isNotEntityDelete ? ` ${entityMethod}` : ''}`;
    const modalHint = confirmationHint || '';
    const modalTitle = confirmationTitle || (isBulk ? 'Bulk Delete' : 'Delete');

    const confirm = () => {
      const request = axios.delete(url, {params});
      const wrappedRequest = wrapRequest({...deleteOptions, dispatch, request});

      wrappedRequest
        .then(response => {
          const {data} = response;

          if (isBulk && data && (data.deleted || data.failed)) {
            if (data.deleted.count) {
              toastr.success(
                `${data.deleted.count} Removed Successfully`
              );
            }

            if (data.failed.count) {
              toastr.error(
                `${data.failed.count} Failed to remove`,
                data.failed.message
              );
            }
          } else if (hasToastr) {
            toastr.success(
              'Removed Successfully',
              `${capitalize(entityItem)}${isNotEntityDelete ? ` ${entityMethod}` : ''} ${isBulk ? 'have' : 'has'} been removed`
            );
          }

          return response;
        })
        .then($promiseResolve)
        .catch($promiseReject);

      return wrappedRequest;
    };

    if (hasConfirmation) {
      dispatch(toggleConfirmationModal({
        title: modalTitle,
        text: modalText,
        hint: modalHint,
        question: confirmationQuestion,
        confirmText: confirmationBtnTxt || 'Yes, Delete',
        cancelText: cancelBtnTxt || 'Cancel',
        confirm
      }));
    } else {
      confirm();
    }

    return $promise;
  };
}

export default remove;
