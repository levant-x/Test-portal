import useEntity from "../../application/use-entity";
import articlesService from "../../services/articles-service";
import { IArticle } from "../../types/models";
import ArticlePreview from "../components/article/ArticlePreview";
import Preloader from "../components/Preloader";

export default function Home() {
  const { 
    isLoading, 
    entity, 
  } = useEntity(articlesService)
  const articles = entity as IArticle[]

  return (
    <>
      <p><em><small className="text-start">
        {articles.length > 0 ? 
          'Кликните по статье, чтобы увидеть полный текст, комментарии и оставить свой' :
          'Элементы не найдены'
        }
      </small></em></p>

      {/* TODO form for a new one */}     

      {(articles as IArticle[]).map((article) => 
        <ArticlePreview key={article.id} {...article} />
      )}

      {isLoading && <Preloader />}
    </>
  )
}