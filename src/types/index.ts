export * from './settings'
export * from './engines'

export interface IMsgItem {
    type: 'error' | 'success'
    content: string
}
