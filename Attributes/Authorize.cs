using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Portal.Models;

namespace Portal.Attributes
{
    class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (User)context.HttpContext.Items["User"];
            if (user == null) context.Result = new RedirectResult("/Auth");
            else OnAuthorize(user, context);
        }

        protected virtual void OnAuthorize(User user, AuthorizationFilterContext context)
        {
            if (user.Profile != null) return;
            var message = "Добро пожаловать! Для завершения регистрации заполните свой профиль";
            var level = "warning";
            context.Result = new JsonResult(new { message, level, }) 
            { 
                StatusCode = StatusCodes.Status401Unauthorized 
            };
        }
    }
}