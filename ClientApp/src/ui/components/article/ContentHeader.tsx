import { IUser, IContent } from "../../../types/models"

type Props = IUser & Pick<IContent, 'publishedAt'>

export default function ContentHeader({
  profile, email, phone, publishedAt,  
}: Props) {
  return (
    <small className="d-flex justify-content-between">
      <span>{profile?.firstName || email || phone}</span>
      <span><em>{new Date(publishedAt).toLocaleString('ru')}</em></span>
    </small>
  )
}