'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _confirmation = require('../confirmation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRemove(base, config) {
  var getURL = base.getURL,
      wrapRequest = base.wrapRequest;
  var toastr = config.toastr;


  return function (options) {
    var deleteOptions = _extends({
      entityMethod: 'delete'
    }, options);

    var params = deleteOptions.params,
        entity = deleteOptions.entity,
        entityMethod = deleteOptions.entityMethod,
        _deleteOptions$isBulk = deleteOptions.isBulk,
        isBulk = _deleteOptions$isBulk === undefined ? false : _deleteOptions$isBulk,
        _deleteOptions$hasToa = deleteOptions.hasToastr,
        hasToastr = _deleteOptions$hasToa === undefined ? true : _deleteOptions$hasToa,
        _deleteOptions$confir = deleteOptions.confirmation,
        confirmation = _deleteOptions$confir === undefined ? {
      text: '',
      hint: '',
      question: '',
      color: '',
      title: '',
      btnTxt: '',
      cancelBtnTxt: ''
    } : _deleteOptions$confir;


    var url = getURL(deleteOptions);
    var entityItem = _pluralize2.default.singular(entity);

    return function (dispatch) {
      var $promiseResolve = void 0;
      var $promiseReject = void 0;

      var $promise = new Promise(function (resolve, reject) {
        $promiseResolve = resolve;
        $promiseReject = reject;
      });

      var isNotEntityDelete = entityMethod !== 'delete';

      var confirm = function confirm() {
        var request = _axios2.default.delete(url, { params: params });
        var wrappedRequest = wrapRequest(_extends({}, deleteOptions, { dispatch: dispatch, request: request }));

        wrappedRequest.then(function (response) {
          var data = response.data;


          if (isBulk && data && (data.deleted || data.failed)) {
            if (data.deleted.count) {
              toastr.show({
                type: 'success',
                title: data.deleted.count + ' Removed Successfully'
              });
            }

            if (data.failed.count) {
              toastr.show({
                type: 'error',
                title: data.failed.count + ' Failed to remove',
                text: data.failed.message
              });
            }
          } else if (toastr && hasToastr) {
            toastr.show({
              type: 'success',
              title: 'Removed Successfully',
              text: '' + (0, _capitalize2.default)(entityItem) + (isNotEntityDelete ? ' ' + entityMethod : '') + ' ' + (isBulk ? 'have' : 'has') + ' been removed'
            });
          }

          return response;
        }).then($promiseResolve).catch($promiseReject);

        return wrappedRequest;
      };

      if (confirmation) {
        dispatch((0, _confirmation.toggleConfirmationModal)({
          title: confirmation.title || (isBulk ? 'Bulk Delete' : 'Delete'),
          text: confirmation.text || 'delete ' + (isBulk ? 'these' : 'this') + ' ' + entityItem + (isNotEntityDelete ? ' ' + entityMethod : ''),
          hint: confirmation.hint,
          question: confirmation.question,
          color: confirmation.color || 'danger',
          confirmText: confirmation.btnTxt || 'Yes, Delete',
          cancelText: confirmation.cancelBtnTxt || 'Cancel',
          confirm: confirm
        }));
      } else {
        confirm();
      }

      return $promise;
    };
  };
}

exports.default = createRemove;
module.exports = exports['default'];