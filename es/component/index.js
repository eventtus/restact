function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Confirmation from './confirmation';

var CoreApi = function (_Component) {
  _inherits(CoreApi, _Component);

  function CoreApi() {
    _classCallCheck(this, CoreApi);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CoreApi.prototype.render = function render() {
    var LoadingComponent = this.props.loadingComponent;
    var ToasterComponent = this.props.toasterComponent;

    return React.createElement(
      'div',
      null,
      React.createElement(ToasterComponent, null),
      React.createElement(LoadingComponent, null),
      React.createElement(Confirmation, { modalComponent: this.props.modalComponent })
    );
  };

  return CoreApi;
}(Component);

CoreApi.defaultProps = {
  modalComponent: function modalComponent() {},
  loadingComponent: function loadingComponent() {},
  toasterComponent: function toasterComponent() {}
};

CoreApi.propTypes = process.env.NODE_ENV !== "production" ? {
  modalComponent: PropTypes.func,
  loadingComponent: PropTypes.func,
  toasterComponent: PropTypes.func
} : {};

export default CoreApi;