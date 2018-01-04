import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ConfirmationModal extends Component {
  render() {
    const {toggle, confirm, isOpen} = this.props;
    const {
      text,
      question,
      color,
      confirmText,
      cancelText,
      title,
      hint
    } = this.props.contentData;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {
            question || (
              <strong className="font-weight-regular">{`Are you sure you want to ${text}?`}</strong>
            )
          }
          {
            hint && <label className="font-weight-normal -required-lf mt-2">{hint}</label>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>{cancelText}</Button>
          <Button
            color={color}
            onClick={confirm}
          >{confirmText}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  contentData: PropTypes.object.isRequired
};

export default ConfirmationModal;
