import { IData, ITransport, Options } from "../types/common";
import notifier from '../services/notifications-service'
import { TOKEN_BEARER_ID } from "../config/consts";

type Method = 'GET' | 'POST'

class Transport implements ITransport {
  protected readonly TOKEN: string = ''

  constructor() {
/*     const tokenBearer = document.getElementById(TOKEN_BEARER_ID) as HTMLInputElement
    if (!tokenBearer) throw 'Security token not found'
    this.TOKEN = tokenBearer.value */
  }

  async loadOne<T>(url: string, options?: Options): Promise<T> {
    return await this.call<T>(url, 'GET', options)
  }

  async loadMany<T>(url: string, options?: Options): Promise<T[]> {
    return await this.call<T[]>(url, 'GET', options)
  }

  save(url: string, item: IData): Promise<IData> {
    throw new Error("Method not implemented.");
  }

  protected async call<T>(url: string, method: Method, options?: Options): Promise<T> {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.TOKEN,
      }
    }).then(async (resp) => {
      const result = options?.rawText ? resp : await resp.json()  
      if (resp.status.toString()[0] == '4' && result.message) throw result
      return result
    }).catch(this.catch)
  }

  protected catch(er: any): void {
    // TODO define kinds of errors
    notifier.notify({
      id: -1,
      type: 'alert',
      body: er.message,
      ...er,
    })
    console.error(`Call completed with errors: ${er}`);
  }
}

export default new Transport()