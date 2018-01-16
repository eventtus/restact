var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var TOGGLE_CONFIRMATION_MODAL = 'core-api/confirmation-modal/toggle';

function toggleConfirmationModal() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (dispatch) {
    return dispatch(_extends({
      type: TOGGLE_CONFIRMATION_MODAL
    }, options));
  };
}

export { TOGGLE_CONFIRMATION_MODAL };
export { toggleConfirmationModal };