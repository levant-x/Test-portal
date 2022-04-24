import { IData, ITransport, Options } from "../types/common";
import notifier from '../services/notifications-service'
import { TOKEN_BEARER_ID } from "../config/consts";
import { toJS } from "mobx";

type Method = 'GET' | 'POST'

class Transport implements ITransport {
  protected readonly TOKEN: string = ''

  constructor() {
    const tokenBearer = document.getElementById(TOKEN_BEARER_ID) as HTMLInputElement
    if (!tokenBearer) throw 'Security token not found'
    this.TOKEN = tokenBearer.value
  }

  async loadOne<T>(url: string, options?: Options): Promise<T> {
    return await this.call<T>(url, 'GET', options)
  }

  async loadMany<T>(url: string, options?: Options): Promise<T[]> {
    return await this.call<T[]>(url, 'GET', options)
  }

  save(url: string, item: IData): Promise<IData> {
    return this.call(url, 'POST', {
      body: JSON.stringify(toJS(item)),
    })
  }

  protected async call<T>(url: string, method: Method, options?: Options): Promise<T> {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN,
      },
      ...options,
    }).then(async (resp) => {
      // debugger
      const result = options?.rawText ? resp : await resp.json()  
      if (resp.status.toString()[0] == '4' && result.message) throw result
      return result
    }).catch(this.catch)
  }

  protected catch(er: any): void {
    // TODO define kinds of errors
    console.error(`Call completed with errors: ${er}`);
    if (!er.level) return

    notifier.notify({
      id: -1,
      type: 'alert',
      level: er.level,
      body: er.message,
    })
  }
}

export default new Transport()