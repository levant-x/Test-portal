using Microsoft.AspNetCore.Mvc;
using InnoPortal.Models;

namespace InnoPortal
{
    public class HomeController: Controller
    {
        public IActionResult Index()
        {
            var spaVm = new CreateReactAppViewModel(HttpContext);
            return View(spaVm);
        }
    }
}