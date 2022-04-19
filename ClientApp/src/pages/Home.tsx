import ArticlePreview from "../components/ArticlePreview";
import Preloader from "../components/Preloader";

export default function Home() {
  const articles = [
    {
      author: {
        id: 1,
        name: 'Some novice user',
        phone: '8XXXXXXXXXX'
      },
      id: 6,
      title: 'A mock article',
      body: "This is a dummy sample to see what a new article card looks like. This is a dummy sample to see what a new article card looks like. This is a dummy sample to see what a new article card looks like. This is a dummy sample to see what a new article card looks like. It's not a full text",
      publishedAt: "05.18.2022 19:11:37",
      "likesNum": 28,
      "dislikesNum": 51,
      "commentsNum": 2
    },
    {
      author: {
        id: 1,
        name: 'Some novice user',
        phone: '8XXXXXXXXXX'
      },
      id: 6,
      title: 'A mock article',
      body: "This is a dummy sample to see what a new article card looks like. This is a dummy sample to see what a new article card looks like. This is a dummy sample to see what a new article card looks like. This is a dummy sample to see what a new article card looks like. It's not a full text",
      publishedAt: "05.18.2022 19:11:37",
      likesNum: 28,
      dislikesNum: 51,
      "commentsNum": 2
    }    
  ]

  /* useEffect(() => {
    fetch('/api/articles/all', {
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(
      resp => resp.json().then(data => setA(data))
    ).catch(er => console.error(er));
    console.log('test api call sent');
  }, [])
 */

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

      {articles.map((article, i) => <ArticlePreview key={i} {...article} />)}

      <Preloader /> {/* TODO make conditional */}
    </>
  )
}