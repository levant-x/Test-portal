import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import { LIKE_ACTIVE_CLASS_NAME } from "../../../config/consts";
import { Estimation, IClickable, IData } from "../../../types/common";
import { IArticle } from "../../../types/models";
import Attitude from "../estimate/Attitude";
import ContentHeader from "./ContentHeader";

type Props = IClickable<{ value: Estimation } & IData> & {
  article: IArticle  
}

export default function ArticlePreview({
  article,
  onClick,
}: Props) {
  return (
    <Card className="my-4">
      <CardHeader>
        <ContentHeader 
          {...article} 
          {...article.author} 
        />
      </CardHeader>
      
      <CardBody>
        <CardTitle tag="h5">
          {article.title}
        </CardTitle>

        <CardText>
          {article.body}
        </CardText>
      </CardBody>

      <small><div className="px-3 mb-2 d-flex justify-content-between">
        <span>
          <i className="bi bi-chat-right-text pe-1"></i>
          {article.commentsNum}
        </span>

        <Attitude 
          onClick={value => article.canBeEstimated && onClick?.({ value, id: article.id, })} 
          onHover={e => article.canBeEstimated && e.classList.toggle(LIKE_ACTIVE_CLASS_NAME)}
          {...article} 
        /></div>
      </small>
    </Card>
  )
}