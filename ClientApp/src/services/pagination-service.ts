import { action, computed, makeObservable, observable, reaction } from "mobx";
import { IData, IPagination, ITransport } from "../types/common";

type Paging = {
  total: number
  limit: number
}

type NavPointer = {
  page: number // 1 seeding
  ordinal: number // 1 seeding
}

export default class PaginationService implements IPagination {
  private _navigation: Record<number, NavPointer> = {}

  protected state = observable({
    paging: {
      total: 0, limit: 0,
    } as Paging,
    currentPage: 1,    
    newPage: 1, 
  })

  index: IData[] = []
  onPageEnd: (upcomingPage: number) => void

  get total(): number { return this.state.paging.total }
  get currentPage(): number { return this.state.currentPage }

  constructor(protected transport: ITransport) {
    makeObservable(this, {
      total: computed,
      currentPage: computed,
      index: observable,
      load: action.bound,
      scrollTo: action.bound,
    })
    reaction(() => this.index, arg => this.onIndexChange(arg))
    reaction(() => this.state.newPage, () => this.onPageEnd?.(this.state.newPage))
  }

  scrollTo(id: number): void {
    if (!this._navigation[id]) return
    this.state.currentPage = this._navigation[id].page

    const { currentPage, paging } = this.state
    const { ordinal } = this._navigation[id]    
    const edge = ordinal % paging.limit
    
    if (edge === 1 && currentPage > 1 ) this.state.newPage = currentPage - 1
    else if (edge === 0 && ordinal < paging.total) this.state.newPage = currentPage + 1
  }

  /** Updates the total pages info, the custom endpoint is {count} */
  load(url: string): void {    
    url = url.replace('{count}', 'count')
    const setTotal = action((value: Paging) => this.state.paging = value)
    this.transport.loadOne<Paging>(url).then(setTotal);
  }

  protected onIndexChange(newIndex: IData[]): void {
    this._navigation = newIndex.reduce((acc, item, index) => ({
      ...acc, [item.id]: <NavPointer>{
        page: Math.floor(index / this.state.paging.limit) + 1,
        ordinal: index + 1, 
      }
    }), {})    
  }
}