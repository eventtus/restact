// @flow

export type ToasterConfigType = {
  show: (params?: {
    type?: 'error' | 'success' | 'info',
    title?: string,
    text: string,
    options?: {
      timeout?: number,
      attention?: boolean
    }
  }) => any
}
