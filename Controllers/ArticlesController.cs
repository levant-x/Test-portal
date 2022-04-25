using Microsoft.AspNetCore.Mvc;
using Portal.Interfaces;
using Portal.Services;
using Portal.Attributes;
using Portal.Models;
using Portal.Helpers;

namespace Portal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ArticlesController : Controller
    {
        protected IArticlesService articlesService;
        protected DataContext dbContext;

        public ArticlesController(IArticlesService articlesService, DataContext dbContext)
        {
            this.articlesService = articlesService;
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("all/{page:int}")]
        public IActionResult GetAll(int page)
        {
            return Ok(articlesService.GetFeed(page));
        }

        [HttpGet]
        [Route("all")]
        public IActionResult GetAll()
        {
            return Ok(new { Total = articlesService.Total });
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Get(int id)
        {
            return Ok($"Will return an article item {id} later");
        }

        [HttpPost]
        public IActionResult Post(Article article)
        {
            article = (Article)articlesService.PublishArticle(article.Body).Entity;
            return new JsonResult(article);
        }
    }
}