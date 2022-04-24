using Microsoft.AspNetCore.Mvc;
using Portal.Interfaces;
using Portal.Services;
using Portal.Attributes;

namespace Portal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
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
        [Route("all/{page:int}")]
        public IActionResult GetAll(int page)
        {
            return Ok(articlesService.GetFeed(page));
        }

        [HttpGet]
        [Route("all/{page:int?}")]
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
    }
}