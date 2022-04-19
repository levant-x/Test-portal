using Microsoft.AspNetCore.Mvc;
using Portal.Interfaces;

namespace InnoPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        protected IArticlesService articlesService;

        public ArticlesController(IArticlesService articlesService)
        {
            this.articlesService = articlesService;
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