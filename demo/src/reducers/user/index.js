import {FETCH} from '../../actions';

const initial = {
  id: 0,
  avatar: '',
  firstName: '',
  lastName: ''
};

export function user(state = initial, {type, data}) {
  switch (type) {
    case FETCH: {
      const {
        id,
        avatar,
        first_name: firstName,
        last_name: lastName
      } = data.data;

      return {
        id,
        avatar,
        firstName,
        lastName
      };
    }

    default:
      return state;
  }
}
