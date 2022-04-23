export enum Paths {
  home = '/',
  profile = '/profile',
  logout = '/logout'
}

export enum Estimation {
  liked, disliked,
}


export type Options = Record<string, any> & {
  rawText?: boolean
  level?: 'info' | 'warning' | 'danger'
}

export type Message = Options & IData & {
  type?: 'alert' | 'close' | 'update'
  body?: any
}


export interface IData {
  id: number
}

export interface IChildren {
  children?: React.ReactNode
}

export interface IPageable {
  currentPage: number
}

export interface ILoadable {
  load(url: string): void
}

export interface INotifyable {
  notify(message: Message): void
}

export interface INotifier {
  readonly messages: Message[]  
}

export interface IItemsStore<T extends IData> extends IPageable, ILoadable {  
  readonly items: T[]
  readonly isLoading: boolean
  save(item: T): Promise<boolean>
}

export interface IDeletable {
  delete(id: number): Promise<boolean>
}

export interface ITransport {
  loadOne<T>(url: string, options?: Options): Promise<T>
  loadMany<T>(url: string, options?: Options): Promise<T[]>
  save(url: string, item: IData): Promise<IData>
}

export interface IPagination extends IPageable, ILoadable {
  total: number
}

