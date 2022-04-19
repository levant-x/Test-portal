import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import { IArticle } from "../../types/models";
import Attitude from "./estimate/Attitude";
import ContentHeader from "./ContentHeader";

export default function ArticlePreview(article: IArticle) {
  return (
    <>
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

        <small>
          <div className="px-3 mb-2 d-flex justify-content-between">
            <span><i className="bi bi-chat-right-text pe-1"></i>{article.commentsNum}</span>

            <Attitude {...article} />
          </div>
        </small>
      </Card>
    </>
  )
}