import { action, makeAutoObservable } from "mobx";
import { APIEndpoints } from "../config/consts";
import transport from "../infrastructure/transport";
import { IData, IEntityStore, ITransport } from "../types/common";
import { IUser } from "../types/models";

type Response = Pick<IEntityStore<IData>, 'errors'> & IData

class UserProfileService implements IEntityStore<IUser> {
  private _isLoading: boolean = false
  private _user: IUser = { id: 0, profile: { id: 0, }, }
  private _url = APIEndpoints.userProfile
  private _errors?: Record<string, any>

  get entity(): IUser | undefined {
    return this._user
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  get errors(): Record<string, string> | undefined {
    return {...this._errors}
  }

  constructor(protected transport: ITransport) {
    makeAutoObservable(this)
    this.load()
  }

  @action async save(): Promise<boolean> {
    this._isLoading = true
    const result = this.transport.save(this._url, this._user!)
      .then(resp => this._onSave(resp))
    return result
  }

  @action load(): void {
    if (this._user.id) return

    this._isLoading = true
    const onFetch = (resp: IUser) => {
      this._user = resp
      this._isLoading = false
    }
    transport.loadOne<IUser>(this._url).then(onFetch)
  }

  protected formatErrors(item: any): Record<string, string> {
    const result = Object.entries(item).reduce((acc, [key, value]) => ({
        ...acc,
        [key.slice(key.lastIndexOf('.') + 1)]: value,
      }), {});
    return result
  }

  @action private _onSave(resp: Response): boolean { 
    let {errors} = resp
    if (errors) errors = this.formatErrors(errors)

    this._errors = errors
    this._isLoading = false
    return this._errors ? false : true
  }
}

export default new UserProfileService(transport)