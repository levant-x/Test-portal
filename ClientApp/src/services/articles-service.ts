import { APIEndpoints } from "../config/consts"
import ArticlesStore from "../infrastructure/articles-store"
import transport from "../infrastructure/transport"
import { IEntityStore } from "../types/common"
import { IArticle } from "../types/models"
import PaginationService from "./pagination-service"

class ArticlesService implements IEntityStore<IArticle> {
  protected paginationService = new PaginationService(transport)
  protected articlesStore = new ArticlesStore(transport)

  entity: IArticle[] = []
  currentPage: number = 0
  isLoading: boolean = false

  constructor() {
    const pgn = this.paginationService
    !pgn.total && pgn.load(APIEndpoints.articles)
  }

  save(item: IArticle): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  
  load(url?: string): void {
    throw new Error("Method not implemented.")
  }
}

export default new ArticlesService()