import { computed, makeObservable, reaction } from "mobx"
import { APIEndpoints } from "../config/consts"
import transport from "../infrastructure/transport"
import { Estimation, IData, IExplainer, IPagination, ITransport } from "../types/common"
import { IArticle } from "../types/models"
import EntityService from "./entity-service"
import PaginationService from "./pagination-service"

class ArticlesService extends EntityService<IArticle> {
  protected pageIndex: number[] = [] 
  protected itemsIndex: number[] = []

  protected get articles(): IArticle[] { return this.state.entity }

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

  estimate( args: { value: Estimation } & IData): void {
    const url = APIEndpoints.articleEstimate.replace('{id}', args.id.toString())
    const isPositive = Boolean(args.value)
    this.transport.save(url, isPositive).then(resp => {
      const article = this.articles.find(article => article.id == args.id)
      article.estimation = Number(resp) as Estimation
    })
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
    this.articles.forEach(this._formatValues) 
    this._reorderByTime()
  }

  protected override afterSaveSuccessful(article: IArticle): void {
    this._formatValues(article) // make a new look like the rest
    super.afterSaveSuccessful(article)
    this._reorderByTime()
  }

  private _formatValues(article: IArticle): void {
    article.publishedAt = new Date(article.publishedAt.toString())
    if (article.estimation === null) article.estimation = Estimation.none
    else article.estimation = Number(article.estimation) as Estimation
  }

  private _reorderByTime(): void {
    const toNumber = (article: IArticle) => article.publishedAt.getTime()
    this.articles.sort((older, newer) => toNumber(newer) - toNumber(older))
  }
}

const articlesPagination = new PaginationService(transport)
export default new ArticlesService(transport, articlesPagination)