import api from './api';

const FETCH = 'fetch';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';

const entity = 'users';

function fetch(id) {
  return api.get({
    entity,
    entityParams: {id},
    actionType: FETCH
  });
}

function remove(id) {
  return api.remove({
    entity,
    entityParams: {id},
    actionType: DELETE
  });
}

function add({name}) {
  return api.create({
    entity,
    actionType: CREATE,
    data: {name},
    headers: {
      'Accept-Language': 'en'
    }
  });
}

function edit(id, {name}) {
  return api.update({
    entity,
    entityParams: {id},
    confirmation: true,
    actionType: UPDATE,
    data: {name},
    headers: {
      'Accept-Language': 'en'
    }
  });
}

export {FETCH, CREATE, DELETE, UPDATE};
export {fetch, add, remove, edit};
