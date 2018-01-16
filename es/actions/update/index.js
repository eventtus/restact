var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import axios from 'axios';
import pluralize from 'pluralize';
import capitalize from 'capitalize';
import { toggleConfirmationModal } from '../confirmation';

function createUpdate(base, config) {
  var getURL = base.getURL,
      wrapRequest = base.wrapRequest;
  var toastr = config.toastr;


  return function (options) {
    var updateOptions = _extends({
      entityMethod: 'update'
    }, options);

    var data = updateOptions.data,
        _updateOptions$params = updateOptions.params,
        params = _updateOptions$params === undefined ? {} : _updateOptions$params,
        _updateOptions$header = updateOptions.headers,
        headers = _updateOptions$header === undefined ? {} : _updateOptions$header,
        entity = updateOptions.entity,
        entityMethod = updateOptions.entityMethod,
        _updateOptions$hasToa = updateOptions.hasToastr,
        hasToastr = _updateOptions$hasToa === undefined ? true : _updateOptions$hasToa,
        _updateOptions$confir = updateOptions.confirmation,
        confirmation = _updateOptions$confir === undefined ? false : _updateOptions$confir,
        toasterText = updateOptions.toasterText;


    var url = getURL(updateOptions);
    var entityItem = pluralize.singular(entity);

    return function (dispatch) {
      var $promiseResolve = void 0;
      var $promiseReject = void 0;

      var $promise = new Promise(function (resolve, reject) {
        $promiseResolve = resolve;
        $promiseReject = reject;
      });

      var isNotEntityUpdate = entityMethod !== 'update';

      var confirm = function confirm() {
        var request = axios.put(url, data, { headers: headers, params: params });

        return wrapRequest(_extends({}, updateOptions, { dispatch: dispatch, request: request })).then(function () {
          if (toastr && hasToastr) {
            toastr.show({
              type: 'success',
              title: 'Updated Successfully',
              text: toasterText || capitalize(entityItem) + ' has been updated'
            });
          }
        }).then($promiseResolve).catch($promiseReject);
      };

      if (confirmation) {
        dispatch(toggleConfirmationModal({
          title: confirmation.title || 'Update',
          text: confirmation.text || 'update this ' + entityItem + (isNotEntityUpdate ? ' ' + entityMethod : ''),
          hint: confirmation.hint,
          question: confirmation.question,
          color: confirmation.color || 'success',
          confirmText: confirmation.btnTxt || 'Yes, update',
          confirm: confirm
        }));
      } else {
        confirm();
      }

      return $promise;
    };
  };
}

export default createUpdate;