import { IPagination, ITransport } from "../types/common";

export default class PaginationService implements IPagination {
  total: number = 0
  currentPage: number = 1
  isLoading: boolean = false
  mode: "one"

  constructor(protected transport: ITransport) {}

  scroll(id: number): void {
    throw new Error("Method not implemented.");
  }

  /** Updates the total pages info, the custom endpoint is {count} */
  load(url: string): void {    
    url = url.replace('{count}', 'count')
    this.transport.loadOne<{ total: number }>(url).then(resp => this.total = resp?.total);
  }
}