using System;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Portal.Helpers;
using Portal.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Linq;
using System.Text;
using Portal.Models;

namespace Portal.Services
{
    class UsersService : IUsersService
    {
        protected readonly DataContext dataContext;
        protected readonly AppConfig config;

        public UsersService(DataContext dataContext, IOptions<AppConfig> config)
        {
            this.dataContext = dataContext;
            this.config = config.Value;
        }

        public IAuthResult Authenticate(string login, string password)
        {
            var user = dataContext.Users
                .SingleOrDefault(existing => existing.Password == password &&
                (existing.EMail == login || existing.Phone == login));
            if (user == null) return null;
            return new AuthResult()
            {
                Token = _GenerateJwt(user.ID),
                Bearer = user
            };
        }

        public IUser GetByID(int id)
        {
            return dataContext.Users.FirstOrDefault(user => user.ID == id);
        }

        public void Logout()
        {
            throw new System.NotImplementedException();
        }

        public bool RegisterNew(IUser userData)
        {
            if (dataContext.Users
                .Any(user => user.EMail == userData.EMail || user
                .Phone == userData.Phone)) return false;

            dataContext.Users.Add((User)userData);
            dataContext.SaveChanges();
            return true;
        }

        public bool Update(IUser user, IProfile profile)
        {
            throw new System.NotImplementedException();
        }

        private string _GenerateJwt(int id)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config.ApiKey));
            var encryptor = SecurityAlgorithms.HmacSha256Signature;

            var jwtDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", id.ToString()) }),
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = new SigningCredentials(key, encryptor)
            };
            var jwt = jwtHandler.CreateToken(jwtDescriptor);
            return jwtHandler.WriteToken(jwt);
        }
    }
}