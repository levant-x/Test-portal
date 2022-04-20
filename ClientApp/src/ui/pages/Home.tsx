import useArticles from "../../application/use-articles";
import ArticlePreview from "../components/article/ArticlePreview";
import Preloader from "../components/Preloader";

export default function Home() {
  const { isLoading, articles } = useArticles()

  return (
    <>
      <p>
        <em>
          <small className="text-start">
            Кликните по статье, чтобы увидеть полный текст, комментарии и оставить свой
          </small>
        </em>
      </p> 

      {/* TODO form for a new one */}     

      {articles.map((article) => <ArticlePreview key={article.id} {...article} />)}

      {isLoading && <Preloader />}
    </>
  )
}