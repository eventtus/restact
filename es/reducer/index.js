var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { TOGGLE_CONFIRMATION_MODAL } from '../actions/confirmation';

var initialState = {
  isOpen: false,
  confirm: function confirm() {},
  text: '',
  title: 'Confirmation Dialogue',
  confirmText: 'Confirm'
};

export default function confirmationModal() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var _ref = arguments[1];

  var type = _ref.type,
      options = _objectWithoutProperties(_ref, ['type']);

  switch (type) {
    case TOGGLE_CONFIRMATION_MODAL:
      return _extends({}, state, options, {
        isOpen: !state.isOpen
      });

    default:
      return state;
  }
}