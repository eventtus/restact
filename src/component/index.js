import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Confirmation from './confirmation';

class CoreApi extends Component {
  render() {
    const LoadingComponent = this.props.loadingComponent;
    const ToasterComponent = this.props.toasterComponent;

    return (
      <div>
        <ToasterComponent/>
        <LoadingComponent/>
        <Confirmation modalComponent={this.props.modalComponent}/>
      </div>
    );
  }
}

CoreApi.defaultProps = {
  modalComponent: () => {},
  loadingComponent: () => {},
  toasterComponent: () => {}
};

CoreApi.propTypes = {
  modalComponent: PropTypes.func,
  loadingComponent: PropTypes.func,
  toasterComponent: PropTypes.func
};

export default CoreApi;
