import { action, computed, makeObservable, observable } from "mobx";
import { IPagination, ITransport } from "../types/common";

type Total = {
  total: number
}

export default class PaginationService implements IPagination {
  protected state = observable({
    total: 0, currentPage: 1,
  })

  get total(): number { return this.state.total }
  get currentPage(): number { return this.state.currentPage }

  constructor(protected transport: ITransport) {
    makeObservable(this, {
      total: computed,
      currentPage: computed,
      load: action.bound,
      scroll: action.bound,
    })
  }

  scroll(id: number): void {
    throw new Error("Method not implemented.");
  }

  /** Updates the total pages info, the custom endpoint is {count} */
  load(url: string): void {    
    url = url.replace('{count}', 'count')
    const setTotal = action((value: Total) => this.state.total = value.total)
    this.transport.loadOne<Total>(url).then(setTotal);
  }
}