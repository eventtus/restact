'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _confirmation = require('./confirmation');

var _confirmation2 = _interopRequireDefault(_confirmation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoreApi = function (_Component) {
  _inherits(CoreApi, _Component);

  function CoreApi() {
    _classCallCheck(this, CoreApi);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CoreApi.prototype.render = function render() {
    var LoadingComponent = this.props.loadingComponent;
    var ToasterComponent = this.props.toasterComponent;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(ToasterComponent, null),
      _react2.default.createElement(LoadingComponent, null),
      _react2.default.createElement(_confirmation2.default, { modalComponent: this.props.modalComponent })
    );
  };

  return CoreApi;
}(_react.Component);

CoreApi.defaultProps = {
  modalComponent: function modalComponent() {},
  loadingComponent: function loadingComponent() {},
  toasterComponent: function toasterComponent() {}
};

CoreApi.propTypes = process.env.NODE_ENV !== "production" ? {
  modalComponent: _propTypes2.default.func,
  loadingComponent: _propTypes2.default.func,
  toasterComponent: _propTypes2.default.func
} : {};

exports.default = CoreApi;
module.exports = exports['default'];