using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Portal.Interfaces;

namespace Portal.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppConfig _config;

        public int UserID { get; private set; }

        public JwtMiddleware(RequestDelegate next, IOptions<AppConfig> config)
        {
            _next = next;
            _config = config.Value;
        }

        public async Task Invoke(HttpContext context, IUsersService usersService)
        {
            var token = context.Request.Headers["Authorization"]
                .FirstOrDefault()?.Split(' ')
                .Last();
            if (token != null) _TryAttachUser2Context(context, token, usersService);
            await _next(context);
        }

        private void _TryAttachUser2Context(HttpContext context, string insecureToken,
            IUsersService usersService)
        {
            var validatedToken = _Validate(context, insecureToken);
            if (validatedToken == null) return;

            var token = (JwtSecurityToken)validatedToken;
            var userID = int.Parse(token.Claims.First(claim => claim.Type == "id").Value);
            context.Items[AppConfig.USER_KEY] = usersService.GetByID(userID);
            UserID = userID;
        }

        private SecurityToken _Validate(HttpContext context, string token)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.ApiKey));
            var validator = new JwtSecurityTokenHandler();
            try
            {
                validator.ValidateToken(token, new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero          
                }, out SecurityToken validatedToken);
                return validatedToken;
            }
            catch { return null; }
        }
    }
}