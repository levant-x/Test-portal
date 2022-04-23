import { IPagination, ITransport } from "../types/common";

export default class PaginationService implements IPagination {
  total: number = 0
  currentPage: number = 0

  constructor(protected transport: ITransport) {}

  load(url: string): void {
    this.transport.loadOne<{
      total: number
    }>(url).then(({ total }) => this.total = total);
  }
}