import { makeObservable, observable, reaction } from "mobx"
import { APIEndpoints } from "../config/consts"
import transport from "../infrastructure/transport"
import { IExplainer, IPagination, ITransport } from "../types/common"
import { IArticle } from "../types/models"
import EntityService from "./entity-service"
import PaginationService from "./pagination-service"

class ArticlesService extends EntityService<IArticle> {
  protected pageIndex: number[] = [] 
  protected itemsIndex: number[] = []

  get pagination(): IPagination { return this.paginationService }

  constructor(protected transport: ITransport, protected paginationService: IPagination) {
    super(transport)    
    this.mode = 'many'    
    makeObservable(this.paginationService, {
      currentPage: observable,
      total: observable,
    })

    reaction(() => this.pagination.currentPage, () => this.load()) 
    reaction(() => this.pagination.total, total => total && this.load()) 
    this.load()
  }

  override load() {
    super.load()
  }

  protected override beforeLoad(): boolean {
    const url = APIEndpoints.articles
    this.paginationService.load(url)

    const toLoad = !this.isLoading && this.pagination.total &&
      !this.pageIndex.includes(this.paginationService.currentPage)
    return toLoad
  }

  protected onLoad() {
    const pageNum = this.pagination.currentPage
    this._url = `${APIEndpoints.articles}/${pageNum}`
    return { pageNum }
  }

  protected override afterLoad(resp: IExplainer & { 
    requestBag?: {pageNum: number }; data: IArticle | IArticle[] 
  }): void {
    super.afterLoad(resp)
    this.pageIndex.push(resp.requestBag.pageNum)

    const ids = (resp.data as IArticle[]).map(article => article.id)
    this.itemsIndex = [...this.itemsIndex, ...ids]
  }
}

const articlesPagination = new PaginationService(transport)
export default new ArticlesService(transport, articlesPagination)