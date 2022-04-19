import { IData, ITransport, TransportOptions } from "../types/common";

class Transport implements ITransport {
  loadOne<T>(url: string, options?: TransportOptions): Promise<T> {
    throw new Error("Method not implemented.");
  }

  async loadMany<T>(url: string, options?: TransportOptions): Promise<T[]> {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (!options?.rawText) return resp.json()
    }).catch(this.catch)
  }

  save(url: string, item: IData): Promise<IData> {
    throw new Error("Method not implemented.");
  }

  protected catch(er: any): void {
    // TODO define kinds of errors
    console.error(`Call completed with errors: ${er}`);
  }
}

export default new Transport()