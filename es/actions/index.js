import createBase from './base';
import createGet from './get';
import createSearch from './search';
import createUpdate from './update';
import createCreate from './create';
import createRemove from './remove';

export default function createApi(config) {
  var base = createBase(config);

  return {
    get: createGet(base, config),
    search: createSearch(base, config),
    update: createUpdate(base, config),
    create: createCreate(base, config),
    remove: createRemove(base, config)
  };
}