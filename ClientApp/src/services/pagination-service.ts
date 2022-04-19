import { IPagination } from "../types/common";

export default class PaginationService implements IPagination {
  private _currPage = 1
  private _total = 0

  get currentPage(): number {
    return this._currPage
  }

  set currentPage(value: number) {
    this._currPage = value
    this._total && this.onChange?.(this)
  }

  get total(): number {
    return this._total
  }

  set total(value: number) {
    this._total = value
    this._total && this.onChange?.(this)
  }

  currentItemID?: number
  onChange?: (pagination: IPagination) => void
}