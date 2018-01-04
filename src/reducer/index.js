import {TOGGLE_CONFIRMATION_MODAL} from '../actions/confirmation';

const initialState = {
  isOpen: false,
  confirm: () => {},
  text: '',
  title: 'Confirmation Dialogue',
  confirmText: 'Confirm'
};

export default function confirmationModal(state = initialState, {type, ...options}) {
  switch (type) {
    case TOGGLE_CONFIRMATION_MODAL:
      return {
        ...state,
        ...options,
        isOpen: !state.isOpen
      };

    default:
      return state;
  }
}
