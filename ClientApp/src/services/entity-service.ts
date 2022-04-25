import { action, computed, makeObservable, observable, observe } from "mobx";
import { derefenceKeys, matchFromEntity } from "../infrastructure/utils";
import { IData, IEntityStore, IExplainer, ITransport } from "../types/common";
import notificationsService from "./notifications-service";

type Response<T> = {
  requestBag?: any
  data: T | T[] | IExplainer 
}

export default class EntityService<T extends IData> implements 
  IEntityStore<T>, IData {
  private __id = Math.round(Math.random() * 1000000)
  /** If new items are allowed, then just init it as <T>{} 
   * in the constructor */
  private __newItem?: T
  
  protected state = observable({
    isLoading: false,
    entity: undefined,
    errors: undefined,
  })

  get entity(): T | T[] | undefined { return this.state.entity }
  get isLoading(): boolean { return this.state.isLoading  }
  get id(): number { return this.__id  }
  get newItem(): T | undefined { return this.__newItem }

  mode: "one" | "many"

  get errors(): Record<string, string> | undefined { return this.state.errors  }

  constructor(protected transport: ITransport, protected _url?: string) {
    makeObservable(this, {
      isLoading: computed, 
      entity: computed,
      errors: computed,
      save: action.bound,
      load: action.bound,
    })
    observe(notificationsService, 'messages', () => this.onMessage())
  }

  save(): void {
    this.state.isLoading = true 
    const item = this.__newItem ?? this.state.entity
    const onSaved = (resp: any) => this.afterSave({ data: resp as T })
    const dropStatus = () => this.state.isLoading = false
    this.transport.save(this._url, <T>item).then(onSaved).finally(dropStatus)
  }

  load(): void {
    if (!this.beforeLoad()) return

    const requestBag = this.onLoad()
    this.state.isLoading = true
    const load = this.mode === 'one' ? this.transport.loadOne<T>(this._url) :
      this.transport.loadMany<T>(this._url)

    const saveResult = (data: T | T[]) => this.afterLoad({
      data, requestBag,
    })
    const dripStatus = () => this.state.isLoading = false
    load.then(saveResult).finally(dripStatus)
  }

  protected onMessage(): void {
    const targetNotice = notificationsService.messages
      .find(message => message.id === this.id && message.type === 'update')
    if (!targetNotice) return

    targetNotice.type = 'close'
    notificationsService.notify(targetNotice)
    this.load()
  }

  /** Return load begin condition. False cancels the load. Checks whether the 
   * array or singular item is present by default   */
  protected beforeLoad(): boolean {
    const { entity } = this .state   
    const toLoad = Array.isArray(entity) && !entity.length ||
      !(<IData>entity)?.id
    return toLoad
  }

  /** Do and return whatever you need to persist for the request */
  protected onLoad(): any { }

  /** When some data fetched */
  protected afterLoad(resp: Response<T>): void {
    if (this.mode === 'one') {
      this.state.entity = resp.data as T
      return
    }
    if (!this.state.entity) this.state.entity = [];
    const store = this.state.entity as T[]

    if (Array.isArray(resp.data)) this.state.entity = [...store, ...resp.data]
    else store.push(resp.data as T)
  }

  protected formatErrors(errors: any): Record<string, string> {
    return derefenceKeys(errors, matchFromEntity(this.state.entity))
  }

  protected afterSave(resp: Response<T>): boolean {
    const successful = this.__detectErrors(resp)
    if (successful && this.__newItem) this.__newItem = <T>{} // clear the template  
    return successful
  }

  private __detectErrors(resp: Response<T>): boolean { // after save
    let { errors } = resp.data as IExplainer
    if (errors) errors = this.formatErrors(errors)

    this.state.errors = errors
    return this.state.errors ? false : true
  }
}