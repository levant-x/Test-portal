import { Estimation, IData } from "./common"

interface IEstimatable { estimation?: Estimation }

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

export interface IArticle extends IContent, IEstimatable {
  likesNum: number
  dislikesNum: number
  commentsNum: number
  canBeEstimated?: boolean
}
