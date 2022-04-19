import { PAGINATION_PARAMS_ELEM_ID } from "../config/consts"
import ArticlesStore from "../infrastructure/articles-store"
import transport from "../infrastructure/transport"
import { IArticle } from "../types/models"
import PaginationService from "./pagination-service"

const paginationService = new PaginationService()
const articlesStore = new ArticlesStore(transport, paginationService)

class ArticlesService {
  get isLoading(): boolean {
    return articlesStore.isLoading
  }

  get articles(): IArticle[] {
    return articlesStore.items
  }

  constructor() {
    debugger
    !paginationService.total && this.getTotalCount()
  }

  protected getTotalCount(): void {
    const container = document.getElementById(PAGINATION_PARAMS_ELEM_ID)
    paginationService.total = Number(container?.getAttribute('value'))
  }
}

export default new ArticlesService()