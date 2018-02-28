// @flow
import type {AxiosPromise} from 'axios';
import type {ThunkType} from 'Types/thunk';
import type {ToasterConfigType} from 'Types/toaster';
import type {LoadingConfigType} from 'Types/loading';

export type BaseConfigType = {
  url: string,
  entities: {} | {
    [string]: {} | {
      [string]: (params?: {}) => string
    }
  },
  includeToaster: boolean,
  includeLoading: boolean,
  toaster?: ToasterConfigType,
  loading?: LoadingConfigType,
}

export type WrapConfigType = {
  dispatch: ThunkType,
  request: AxiosPromise<void>,
  actionType: string,
  hasLoader?: boolean,
  onSuccess?: (response?: {}) => void
};

export type UrlOptionsType = {
  entity: string,
  entityMethod: string,
  entityParams?: {},
  entityUrl?: string
}
