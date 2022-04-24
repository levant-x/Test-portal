import { APIEndpoints } from "../config/consts"
import ArticlesStore from "../infrastructure/articles-store"
import transport from "../infrastructure/transport"
import { IEntityStore } from "../types/common"
import { IArticle } from "../types/models"
import PaginationService from "./pagination-service"

const paginationService = new PaginationService(transport) // TODO MOVE TO FIELDS
const articlesStore = new ArticlesStore(transport)

class ArticlesService implements IEntityStore<IArticle> {
  entity: IArticle[] = []
  currentPage: number = 0
  isLoading: boolean = false

  constructor() {
    !paginationService.total && paginationService.load(APIEndpoints.articles)
  }

  save(item: IArticle): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  
  load(url?: string): void {
    throw new Error("Method not implemented.")
  }
}

export default new ArticlesService()