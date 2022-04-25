import { Estimation, IData } from "./common"

export interface IProfile extends IData, Partial<{
  firstName: string
  surname: string
  birthDate: Date
}> {}

export interface IUser extends IData {
  phone?: string
  email?: string
  profile: IProfile
}

export interface IContent extends IData {
  author: IUser
  publishedAt: Date
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
