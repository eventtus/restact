import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleConfirmationModal} from '../../actions/confirmation';

class Confirmation extends Component {
  handleConfirm = () => {
    return this.props.confirmationModal.confirm()
      .then(this.props.toggle);
  }

  render() {
    const {toggle, confirmationModal} = this.props;
    const {
      isOpen,
      text,
      question,
      color = 'danger',
      confirmText = 'Yes',
      cancelText = 'Cancel',
      title = 'Confirmation',
      hint
    } = confirmationModal;

    const ModalComponent = this.props.modalComponent;

    return (
      <ModalComponent
        isOpen={isOpen}
        toggle={toggle}
        confirm={this.handleConfirm}
        contentData={{
          title,
          question,
          text,
          hint,
          confirmText,
          color,
          cancelText
        }}
      />
    );
  }
}

Confirmation.propTypes = {
  toggle: PropTypes.func.isRequired,
  modalComponent: PropTypes.func.isRequired,
  confirmationModal: PropTypes.object.isRequired
};

const mapStateToProps = ({confirmationModal}) => ({confirmationModal});
const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleConfirmationModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
