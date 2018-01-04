const TOGGLE_CONFIRMATION_MODAL = 'core-api/confirmation-modal/toggle';

function toggleConfirmationModal(options = {}) {
  return dispatch => dispatch({
    type: TOGGLE_CONFIRMATION_MODAL,
    ...options
  });
}

export {TOGGLE_CONFIRMATION_MODAL};
export {toggleConfirmationModal};
