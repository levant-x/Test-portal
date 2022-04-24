import { action, computed, makeAutoObservable } from "mobx"
import { APIEndpoints } from "../config/consts"
import { IEntityStore, ITransport } from "../types/common"
import { IArticle } from "../types/models"


export default class ArticlesStore implements IEntityStore<IArticle> {
  private _items: IArticle[] = []
  private _isLoading = false
  private _loadedPages: number[] = []

  currentPage = 0

  get entity(): IArticle[] {
    return [...this._items]
  }

  @computed get isLoading(): boolean {
    return this._isLoading
  }

  constructor(private _transport: ITransport) {
    makeAutoObservable(this)
  }

  load(): void {
    throw new Error("Method not implemented.")
  }

  async save(item: IArticle): Promise<boolean> {
    throw new Error("Method not implemented.")
  }

  @action private async _loadCurrPage(pageNum: number): Promise<void> {
    const {_isLoading, currentPage, _loadedPages} = this
    if (_isLoading || !currentPage || _loadedPages.includes(pageNum)) return

    this._isLoading = true
    const url = `${APIEndpoints.articles}/${pageNum}`

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