import { action, computed, makeAutoObservable } from "mobx"
import { ARTICLES_URL } from "../config/consts"
import { IItemsStore, IPagination, ITransport } from "../types/common"
import { IArticle } from "../types/models"


export default class ArticlesStore implements IItemsStore<IArticle> {
  private _items: IArticle[] = []
  private _isLoading = false
  private _errors: string[] = []
  private _loadedPages: number[] = []

  get items(): IArticle[] {
    return [...this._items]
  }

  @computed get isLoading(): boolean {
    return this._isLoading
  }

  get errors(): string[] {
    return this._errors
  }

  constructor(private _transport: ITransport, private _pgn: IPagination) {
    makeAutoObservable(this)
    _pgn.onChange = () => this._loadCurrPage(_pgn.currentPage)
  }

  async save(item: IArticle): Promise<boolean> {
    throw new Error("Method not implemented.")
  }

  @action private async _loadCurrPage(pageNum: number): Promise<void> {
    const {_isLoading, _pgn, _loadedPages} = this
    if (_isLoading || !_pgn.total || _loadedPages.includes(pageNum)) return

    this._isLoading = true
    const url = `${ARTICLES_URL}/${pageNum}`

    try {
      const articles = await this._transport.loadMany<IArticle>(url)
      this.onDataLoaded(articles)
      this._loadedPages.push(pageNum)
    } finally {
      this._isLoading = false
    }
  }

  @action protected onDataLoaded(articles: IArticle[]): void {
    for (const article of articles) {
      const {id} = article;
      const index = this._items.findIndex(existing => existing.id === id)

      if (index < 0) this._items.push(article)
      else this._items[index] = article
    }
  }
}