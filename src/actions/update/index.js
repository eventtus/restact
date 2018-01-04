import axios from 'axios';
import pluralize from 'pluralize';
import capitalize from 'capitalize';
import {toggleConfirmationModal} from '../confirmation';

function createUpdate(base, config) {
  const {getURL, wrapRequest} = base;
  const {showToastr} = config;

  return function (options) {
    const updateOptions = {
      entityMethod: 'update',
      ...options
    };

    const {
      data, params = {}, headers = {}, entity, entityMethod,
      hasConfirmation, hasToastr = true,
      confirmationText = 'update this',
      confirmationQuestion, confirmationHint, confirmationTitle, confirmationBtnTxt, confirmationColor,
      customToasterMessage
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
      const modalText = confirmationText || `remove this ${entityItem}${isNotEntityUpdate ? ` ${entityMethod}` : ''}`;
      const modalTitle = confirmationTitle || `Update`;
      const modalHint = confirmationHint || '';
      const toasterMessage = customToasterMessage ? customToasterMessage : `${capitalize(entityItem)} has been updated`;
      const confirm = () => {
        const request = axios.put(url, data, {headers, params});

        return wrapRequest({...updateOptions, dispatch, request})
          .then(() => {
            if (hasToastr) {
              showToastr({
                type: 'success',
                title: 'Updated Successfully',
                text: toasterMessage
              });
            }
          })
          .then($promiseResolve)
          .catch($promiseReject);
      };

      if (hasConfirmation) {
        dispatch(toggleConfirmationModal({
          title: modalTitle,
          text: modalText,
          hint: modalHint,
          question: confirmationQuestion,
          color: confirmationColor || 'success',
          confirmText: confirmationBtnTxt || 'Yes, update',
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
