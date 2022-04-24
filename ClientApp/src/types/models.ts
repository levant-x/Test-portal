import { Estimation, IData } from "./common"

export interface IProfile extends IData, Partial<{
  firstname: string
  surname: string
  birthdate: Date
}> {}

export interface IUser extends IData {
  phone?: string
  email?: string
  profile: IProfile
}

export interface IContent extends IData {
  author: IUser
  publishedAt: string
  title?: string
  body: string
}

export interface IArticle extends IContent {
  likesNum: number
  dislikesNum: number
  commentsNum: number
  estimation?: Estimation
  canBeEstimated?: boolean
}
