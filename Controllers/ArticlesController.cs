using Microsoft.AspNetCore.Mvc;
using Portal.Interfaces;
using Portal.Services;

namespace Portal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        protected IArticlesService articlesService;
        protected DataContext dbContext;

        public ArticlesController(IArticlesService articlesService, DataContext dbContext)
        {
            this.articlesService = articlesService;
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("all/{page:int?}")]
        public IActionResult GetAll(int page = 1)
        {
            return Ok(articlesService.GetFeed(page));
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Get(int id)
        {
            return Ok($"Will return an article item {id} later");
        }
    }
}