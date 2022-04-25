using Microsoft.AspNetCore.Mvc;
using Portal.Attributes;
using Portal.Helpers;
using Portal.Interfaces;
using Portal.Models;

namespace Portal
{
    public enum AuthPage
    {
        Login, Register
    }

    public class AuthController: Controller
    {
        protected readonly IUsersService usersService;

        public AuthController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        public IActionResult Index() // login
        {
            ViewBag.AuthPage = AuthPage.Login;
            return View(new LoginVM());
        }

        [HttpPost]
        public IActionResult Index(LoginVM loginVM) // login
        {
            ViewBag.AuthPage = AuthPage.Login;
            if (!ModelState.IsValid) return View(loginVM);

            var credent = usersService.Authenticate(loginVM.Login, loginVM.Password);
            if (credent == null)
            {
                ModelState.AddModelError("", "Учетная запись не найдена");
                return View(loginVM);
            }
            return SPA(credent.Token);
        }

        public IActionResult Register()
        {
            ViewBag.AuthPage = AuthPage.Register;
            return View("Index", new User());
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            ViewBag.AuthPage = AuthPage.Register;
            if (!ModelState.IsValid) return View("Index", user);
            else if (!usersService.RegisterNew(user))
            {
                ModelState.AddModelError("", "Указанные вами данные уже используются\n" +
                    "Укажите другие или авторизуйтесь");
                return View("Index", user);
            } 
            var credent = usersService.Authenticate(user.Email, user.Password);
            return SPA(credent.Token);
        }

        [Authorize(AllowWithoutProfile = true)]
        public IActionResult Profile()
        {
            var user = (User)HttpContext.Items[AppConfig.USER_KEY];
            if (user.Profile == null) user.Profile = new Profile();
            return new JsonResult(user);
        }

        [HttpPost]
        [Authorize(AllowWithoutProfile = true)]
        public IActionResult Profile([FromBody] User user)
        {
            ModelState.Remove("Password"); // password has to change another way
            if (!ModelState.IsValid) 
                return new JsonResult(ModelHelper.GetModelErrors(ModelState));

            var result = usersService.Update(user);
            return new JsonResult(result);
        } 

        protected IActionResult SPA(string token)
        {
            var spaVm = new CreateReactAppVM(HttpContext);
            spaVm.Token = token;            
            return View("_SPA", spaVm);
        }
    }
}