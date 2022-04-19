export enum Paths {
  home = '/',
  profile = '/profile',
  logout = '/logout'
}

export enum Estimation {
  liked, disliked,
}


export type TransportOptions = Record<string, any> & {
  rawText?: boolean
}


export interface IData {
  id: number
}

export interface IChildren {
  children?: React.ReactNode
}

export interface IItemsStore<T extends IData> {  
  readonly items: T[]
  readonly isLoading: boolean
  readonly errors: string[]
  save(item: T): Promise<boolean>
}

export interface IDeletable {
  delete(id: number): Promise<boolean>
}

export interface ITransport {
  loadOne<T>(url: string, options?: TransportOptions): Promise<T>
  loadMany<T>(url: string, options?: TransportOptions): Promise<T[]>
  save(url: string, item: IData): Promise<IData>
}

export interface IPagination {
  readonly currentPage: number
  currentItemID?: number
  total: number
  onChange?: (pagination: IPagination) => void
}

