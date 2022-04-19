import { Estimation, IData } from "./common"

export interface IAuthor extends IData {
  phone?: string
  email?: string
  name?: string
}

export interface IContent extends IData {
  author: IAuthor
  publishedAt: string
  title: string
  body: string
}

export interface IArticle extends IContent {
  likesNum: number
  dislikesNum: number
  commentsNum: number
  estimation?: Estimation
  canBeEstimated?: boolean
}
