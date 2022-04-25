import { action, computed, makeObservable, observable, observe, toJS } from "mobx";
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
  
  protected _entity?
  protected _postUrl?: string
  protected state = observable({
    isLoading: false,
    isSaving: false,
    errors: undefined,
    newItem: {}, 
  })

  mode: "one" | "many"

  get entity(): T | T[] | undefined { return this._entity }
  get newItem(): T | undefined { return <T>this.state.newItem }

  get isLoading(): boolean { return this.state.isLoading  }
  get isSaving(): boolean { return this.state.isSaving }

  get id(): number { return this.__id  }
  get errors(): Record<string, string> | undefined { return this.state.errors  }

  constructor(protected transport: ITransport, protected _url?: string) {
    makeObservable(this, {
      isLoading: computed, 
      isSaving: computed,
      entity: computed,
      errors: computed,
      save: action.bound,
      load: action.bound,
    })
    // observe(this, () => {})
    observe(notificationsService, 'messages', () => this.onMessage())
  }

  save(): void {
    this.state.isSaving = true 
    const item = this.mode === 'many' ? toJS(this.state.newItem) : this._entity
    const url = this._postUrl ?? this._url

    const onSaved = (resp: any) => this.afterSave({ data: resp as T })
    const dropStatus = action(() => this.state.isSaving = false)
    this.transport.save(url, <T>item).then(onSaved).finally(dropStatus)
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
    const dropStatus = action(() => this.state.isLoading = false)
    load.then(saveResult).finally(dropStatus)
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
    const { _entity } = this   
    const toLoad = Array.isArray(_entity) && !_entity.length ||
      !(<IData>_entity)?.id
    return toLoad
  }

  /** Do and return whatever you need to persist for the request */
  protected onLoad(): any { }

  /** When some data fetched */
  protected afterLoad(resp: Response<T>): void {
    if (this.mode === 'one') {
      this._entity = resp.data as T
      return
    }
    if (!this._entity) this._entity = [];
    const store = this._entity as T[]

    if (Array.isArray(resp.data)) this._entity = [...store, ...resp.data]
    else store.push(resp.data as T)
  }

  protected formatErrors(errors: any): Record<string, string> {
    return derefenceKeys(errors, matchFromEntity(toJS(this._entity)))
  }

  protected afterSave(resp: Response<T>): boolean {
    const successful = this.__detectErrors(resp)
    if (successful) this.afterSaveSuccessful(<T>resp.data)
    return successful
  }

  protected afterSaveSuccessful(item: T): void {
    if (this.mode === 'many') this._entity.push(item)
    this.__cleanupSavedItem() // clear the template  
  }

  private __detectErrors(resp: Response<T>): boolean { // after save
    let { errors } = resp.data as IExplainer
    if (errors) errors = this.formatErrors(errors)

    this.state.errors = errors
    return this.state.errors ? false : true
  }

  private __cleanupSavedItem(): void {
    if (this.mode === 'one') return
    const newItem = toJS(this.state.newItem)
    Object.keys(newItem).forEach(key => this.state.newItem[key] = '')
  }
}