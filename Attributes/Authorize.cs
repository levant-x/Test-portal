using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Portal.Models;
using Portal.Helpers;

namespace Portal.Attributes
{
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public bool AllowWithoutProfile { get; set; } 

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (User)context.HttpContext.Items[AppConfig.USER_KEY];
            if (user == null) context.Result = new UnauthorizedResult();
            else OnAuthorize(user, context);
        }

        protected virtual void OnAuthorize(User user, AuthorizationFilterContext context)
        {
            if (user.Profile != null || AllowWithoutProfile) return;
            
            var message = "Добро пожаловать! Для завершения регистрации заполните свой профиль";
            context.Result = new JsonResult(new { message, level = "warning", }) 
            { 
                StatusCode = StatusCodes.Status401Unauthorized 
            };
        }
    }
}