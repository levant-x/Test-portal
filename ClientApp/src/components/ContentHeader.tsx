import { IAuthor, IContent } from "../types/models"

type Props = IAuthor & Pick<IContent, 'publishedAt'>

export default function ContentHeader({
  name, email, phone, publishedAt,  
}: Props) {
  return (
    <small className="d-flex justify-content-between">
      <span>{name || email || phone}</span>
      <span><em>{publishedAt}</em></span>
    </small>
  )
}