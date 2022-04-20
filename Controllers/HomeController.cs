using Microsoft.AspNetCore.Mvc;
using Portal.Models;
using Portal.Interfaces;

namespace Portal
{
    public class HomeController: Controller
    {
        protected IArticlesService articlesService;

        public HomeController(IArticlesService articlesService)
        {
            this.articlesService = articlesService;
        }

        public IActionResult Index()
        {
            var spaVm = new CreateReactAppViewModel(HttpContext);
            spaVm.Total = articlesService.Total;
            return View(spaVm);
        }
    }
}