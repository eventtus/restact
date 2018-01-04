import {createApi} from '../../../../src';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {toastr} from 'react-redux-toastr';

const showToastr = ({type, title, text, ...config}) => {
  toastr[type](title, text, config);
};

export default createApi({
  loading: {
    show: showLoading,
    hide: hideLoading
  },
  toastr: {
    show: showToastr
  },
  url: 'https://reqres.in/api/',
  entities: {
    users: {
      get: ({id}) => `users/${id}`,
      create: () => `users`,
      update: ({id}) => `users/${id}`,
      delete: ({id}) => `users/${id}`
    }
  }
});
