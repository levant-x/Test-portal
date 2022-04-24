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
using Microsoft.EntityFrameworkCore;

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
                .Where(existing => existing.Password == password && (existing
                .Email == login || existing.Phone == login))
                .AsNoTracking()
                .SingleOrDefault();
            if (user == null) return null;
            return new AuthResult()
            {
                Token = _GenerateJwt(user.ID),
                Bearer = user
            };
        }

        public IUser GetByID(int id)
        {
            return dataContext.Users
                .Include(user => user.Profile)
                .SingleOrDefault(user => user.ID == id);
        }

        public void Logout()
        {
            throw new System.NotImplementedException();
        }

        public bool RegisterNew(IUser userData)
        {
            if (dataContext.Users
                .Any(user => user.Email == userData.Email || user
                .Phone == userData.Phone)) return false;

            dataContext.Users.Add((User)userData);
            return dataContext.SaveChanges() == 1;
        }

        public bool Update(IUser user)
        {
            var persistedPassword = dataContext.Users
                .Single(prev => prev.ID == user.ID).Password;
            user.Password = persistedPassword; // the password is updated another way

            dataContext.Update(user);
            return dataContext.SaveChanges() > 0;
        }

        public void Dispose()
        {
            dataContext.Dispose();
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