import { ARTICLES_URL } from "../config/consts"
import ArticlesStore from "../infrastructure/articles-store"
import transport from "../infrastructure/transport"
import { IArticle } from "../types/models"
import PaginationService from "./pagination-service"

const paginationService = new PaginationService(transport) // TODO MOVE TO FIELDS
const articlesStore = new ArticlesStore(transport)

class ArticlesService {


  get isLoading(): boolean {
    return articlesStore.isLoading
  }

  get articles(): IArticle[] {
    return articlesStore.items
  }

  constructor() {
    !paginationService.total && paginationService.load(ARTICLES_URL)
  }
}

export default new ArticlesService()