using System;
using Microsoft.AspNetCore.Mvc;
using Portal.Attributes;
using Portal.Interfaces;
using Portal.Models;

namespace Portal
{
    public enum AuthPage
    {
        Login, Register, Profile
    }

    public class AuthController: Controller
    {
        protected readonly IUsersService usersService;

        public AuthController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        public IActionResult Index()
        {
            // TODO redirect home if authenticated

            ViewBag.AuthPage = AuthPage.Login;
            return View(new LoginVM());
        }

        [HttpPost]
        public IActionResult Index(LoginVM loginVM)
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

            if (!usersService.RegisterNew(user))
            {
                ModelState.AddModelError("", "Указанные вами данные уже используются\n" +
                    "Укажите другие или авторизуйтесь");
                return View("Index", user);
            } 
            var credent = usersService.Authenticate(user.EMail, user.Password);
            return SPA(credent.Token);
        }

        [AuthorizeAttribute]
        public IActionResult Profile()
        {
            ViewBag.AuthPage = AuthPage.Profile; 
            throw new NotImplementedException(); // TODO return markup
        }

        [HttpPost]
        [AuthorizeAttribute]
        public IActionResult Profile(Profile profile)
        {
            ViewBag.Profile = profile;
            throw new NotImplementedException(); // TODO return json
        } 

        protected IActionResult SPA(string token)
        {
            var spaVm = new CreateReactAppVM(HttpContext);
            spaVm.Token = token;            
            return View("_SPA", spaVm);
        }
    }
}