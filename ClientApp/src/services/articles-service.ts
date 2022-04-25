import { computed, makeObservable, reaction } from "mobx"
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
    this._postUrl = APIEndpoints.articles.replace('all', '')
    
    makeObservable(this, {
      pagination: computed,
    })

    reaction(() => this.pagination.currentPage, () => this.load()) 
    reaction(() => this.pagination.total, total => total && this.load()) 
    this.load()
  }

  override load(): void {
    super.load()
  }

  protected override beforeLoad(): boolean {
    const url = APIEndpoints.articles
    this.paginationService.load(url)

    const toLoad = !this.isLoading && this.pagination.total && !this.pageIndex
      .includes(this.paginationService.currentPage)
    return toLoad
  }

  protected onLoad() {
    const pageNum = this.pagination.currentPage
    this._url = `${APIEndpoints.articles}/${pageNum}`
    return { pageNum }
  }

  protected override afterLoad(resp: IExplainer & { 
    requestBag?: {pageNum: number }; data: IArticle[] 
  }): void {
    super.afterLoad(resp)
    this.pageIndex.push(resp.requestBag.pageNum)

    const ids = (resp.data).map(article => article.id)
    this.itemsIndex = [...this.itemsIndex, ...ids];

    // the raw data is actually string formatted, but supposed a date in model
    (this._entity as IArticle[]).forEach(this._formatPublishedAtType) 
    this._reorderByTime()
  }

  protected override afterSaveSuccessful(article: IArticle): void {
    this._formatPublishedAtType(article) // make a new look like the rest
    super.afterSaveSuccessful(article)
    this._reorderByTime()
  }

  private _formatPublishedAtType(article: IArticle): void {
    article.publishedAt = new Date(article.publishedAt.toString())
  }

  private _reorderByTime(): void {
    this.state.isLoading = true
    const toNumber = (article: IArticle) => article.publishedAt.getTime()
    this._entity.sort((older, newer) => toNumber(newer) - toNumber(older))
    this.state.isLoading = false
  }
}

const articlesPagination = new PaginationService(transport)
export default new ArticlesService(transport, articlesPagination)