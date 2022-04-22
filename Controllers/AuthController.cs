using Microsoft.AspNetCore.Mvc;
using Portal.Models;

namespace Portal
{
    public class AuthController: Controller
    {
        public IActionResult Index()
        {
            // TODO redirect home if authenticated

            ViewBag.SignIn = new SignInVM();
            ViewBag.User = new User();
            ViewBag.ShowLogin = true;
            return View();
        }

        public IActionResult LogIn()
        {
            return View("_Login");
        }

        [HttpPost]
        public IActionResult LogIn(SignInVM signIn)
        {
            ViewBag.SignIn = signIn;
            ViewBag.ShowLogin = true;
            if (!ModelState.IsValid) return View("Index");

            return View("_Login");
        }


        public IActionResult Register()
        {
            return View("_Register");
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            ViewBag.User = user;
            if (!ModelState.IsValid) return View("Index");

            return View("_Register");
        }

        public IActionResult Profile()
        {
            return View("_Profile");
        }

        [HttpPost]
        public IActionResult Profile(Profile profile)
        {
            ViewBag.Profile = profile;
            if (!ModelState.IsValid) return View("Index");

            return View("_Profile");
        } 
    }
}