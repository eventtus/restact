var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import axios from 'axios';
import pluralize from 'pluralize';
import capitalize from 'capitalize';

function createCreate(base, config) {
  var getURL = base.getURL,
      wrapRequest = base.wrapRequest;
  var toastr = config.toastr;


  return function (options) {
    var createOptions = _extends({
      entityMethod: 'create'
    }, options);

    var data = createOptions.data,
        entity = createOptions.entity,
        _createOptions$header = createOptions.headers,
        headers = _createOptions$header === undefined ? {} : _createOptions$header,
        _createOptions$hasToa = createOptions.hasToastr,
        hasToastr = _createOptions$hasToa === undefined ? true : _createOptions$hasToa;


    var url = getURL(createOptions);
    var entityItem = pluralize.singular(entity);

    return function (dispatch) {
      var request = axios.post(url, data, { headers: headers });

      return wrapRequest(_extends({}, createOptions, { dispatch: dispatch, request: request })).then(function (_ref) {
        var responseData = _ref.data;

        if (toastr && hasToastr) {
          toastr.show({
            type: 'success',
            title: 'Added Successfully',
            text: capitalize(entityItem) + ' has been added'
          });
        }

        return responseData;
      });
    };
  };
}

export default createCreate;