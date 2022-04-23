

using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Portal.Interfaces;

namespace Portal.Attributes
{
    class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (IUser)context.HttpContext.Items["User"];
            if (user == null) context.Result = new RedirectResult("/Auth");
        }
    }
}