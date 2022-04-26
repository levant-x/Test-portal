import { InputType } from "reactstrap/types/lib/Input"

export enum Paths {
  home = '/',
  profile = '/profile',
  logout = '/logout'
}

export enum Estimation { disliked, liked, none }


export type Options = Record<string, any> & {
  rawText?: boolean
  level?: 'info' | 'warning' | 'danger'
  body?: any
}

export type Message = Options & IData & { type?: 'alert' | 'close' | 'update' }

export type FormProps = { model: any }

export type FormInputProps = IExplainer & {
  attributeName: string 
  label: string  
  type: InputType
}


export interface IData { id: number }

export interface IChildren { children?: React.ReactNode }

export interface IHoverable { onHover?(element: Element): void }

export interface ILoading { readonly isLoading: boolean }

export interface IPageable { readonly currentPage: number }

export interface IExplainer { readonly errors?: Record<string, string> }

export interface ILoadable extends ILoading {
  mode: 'one' | 'many'
  load(url?: string): void
}

export interface IClickable<T = undefined> { onClick?: (args: T) => void }

export interface INotifyable { notify(message: Message): void }

export interface INotifier { readonly messages: Message[] }

export interface IEntityStore<T extends IData> extends ILoadable, IExplainer {  
  readonly entity?: T | T[]
  readonly newItem?: T
  readonly isSaving: boolean
  save(): void
}

export interface IDeletable { delete(id: number): Promise<boolean> }

export interface ITransport {
  loadOne<T>(url: string, options?: Options): Promise<T>
  loadMany<T>(url: string, options?: Options): Promise<T[]>
  save(url: string, item: IData | any): Promise<IData>
}

export interface IPagination extends IPageable, Pick<ILoadable, 'load'> {
  total: number
  scroll(id: number): void
}

