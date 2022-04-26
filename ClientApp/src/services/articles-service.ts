import { action, computed, makeObservable, reaction } from "mobx"
import { APIEndpoints } from "../config/consts"
import transport from "../infrastructure/transport"
import { Estimation, IData, IExplainer, IPagination, ITransport } from "../types/common"
import { IArticle } from "../types/models"
import EntityService from "./entity-service"
import PaginationService from "./pagination-service"

class ArticlesService extends EntityService<IArticle> {
  protected page2Load = 1
  protected pageIndex: number[] = [] 

  protected get articles(): IArticle[] { return this.state.entity }

  get pagination(): IPagination { return this.paginationService }

  constructor(protected transport: ITransport, protected paginationService: IPagination) {
    super(transport)    
    this.mode = 'many'    
    this._postUrl = APIEndpoints.articles.replace('all', '')

    this.pagination.onPageEnd = newPage => {
      this.page2Load = newPage
      this.load()
    }
    makeObservable(this, {
      pagination: computed,      
    })
    reaction(() => this.pagination.total, total => total && this.load()) 
    reaction(() => this.state.entity, action(newSet => this._updateIndexation(newSet)))
    this.load()
  }

  override load(): void {
    super.load()
  }

  estimate( args: { value: Estimation } & IData): void {
    const url = APIEndpoints.articleEstimate.replace('{id}', args.id.toString())
    const isPositive = Boolean(args.value)

    const onSave = (resp: any) => { // !! to be moved to a socket !!
      const article = this.articles.find(article => article.id == args.id)
      const { estimation, deltaPos, deltaNeg } = resp  

      article.estimation = estimation === null ? Estimation.none :
        estimation === true ? Estimation.liked : Estimation.disliked
      article.likesNum += deltaPos
      article.dislikesNum += deltaNeg
    }
    this.transport.save(url, isPositive).then(onSave)
  }

  protected override beforeLoad(): boolean {
    this.paginationService.load(APIEndpoints.articles)
    const { total } = this.pagination
    const { entity } = this.state

    const toLoad = !this.isLoading && total && !this.pageIndex
      .includes(this.page2Load) && (!entity?.length || entity.length < total)
    return toLoad
  }

  protected onLoad() {
    const pageNum = this.page2Load
    this._url = `${APIEndpoints.articles}/${pageNum}`
    return { pageNum } // to ensure the page between scrolls
  }

  protected override afterLoad(resp: IExplainer & { 
    requestBag?: {pageNum: number }; data: IArticle[] 
  }): void {
    super.afterLoad(resp)
    this.pageIndex.push(resp.requestBag.pageNum)

    // the raw data is actually string formatted, but supposed a date in model
    this.articles.forEach(this._formatValues) 
  }

  protected override afterSaveSuccessful(article: IArticle): void {
    this._formatValues(article) // make a new look like the rest
    super.afterSaveSuccessful(article)
    this._reorderByDateTime()
  }

  private _formatValues(article: IArticle): void {
    article.publishedAt = new Date(article.publishedAt.toString())
    if (article.estimation === null) article.estimation = Estimation.none
    else article.estimation = Number(article.estimation) as Estimation
  }

  private _reorderByDateTime(): void {
    const toNumber = (article: IArticle) => article.publishedAt.getTime()
    this.articles.sort((older, newer) => toNumber(newer) - toNumber(older))
  }

  private _updateIndexation(newSet: any): void {
    this.pagination.index = newSet
  }  
}

const articlesPagination = new PaginationService(transport)
export default new ArticlesService(transport, articlesPagination)