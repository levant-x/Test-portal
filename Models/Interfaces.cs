using System;
using System.Collections;
using System.Collections.Generic;

namespace Portal.Interfaces
{
    public interface ICountable
    {
        public int Total { get; }
    }

    public interface IData
    {
        int ID { get; set; }
    }

    public interface IUser: IData
    {
        string Email { get; set; }
        string Phone { get; set; }
        string Password { get; set; }
    }

    public interface IProfile: IData
    {
        string FirstName { get; set; }
        string Surname { get; set; }
        string Avatar { get; set; }
        DateTime BirthDate { get; set; }
    }

    public interface IContentBase: IData
    {
        IUser Author { get; set; }
    }

    public interface IContent: IContentBase
    {
        string Body { get; set; }
        DateTime PublishedAt { get; set; }
    }

    public interface IEstimation : IContentBase
    {        
        bool IsPositive { get; set; }
    }

    public interface IArticlesService: ICountable, IDisposable
    {
        IEnumerable GetFeed(int page);
        IContent GetByID(int id);
        int PublishArticle(string text);
    }

    public interface ICredentials
    {
        string Token { get; set; }
    }

    public interface IAuthResult: ICredentials
    {
        IUser Bearer { get; set; }
    }

    public interface ISaveResult
    {
        IData Entity { get; set; }
        IDictionary<string, string> Errors { get; }
    }

    public interface IUsersService: IDisposable
    {
        IUser GetByID(int id);    
        bool RegisterNew(IUser user);
        IAuthResult Authenticate(string login, string password);
        ISaveResult Update(IUser user);
        void Logout();
    }
}