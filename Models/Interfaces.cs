using System;
using System.Collections;
using System.Collections.Generic;

namespace Portal.Interfaces
{
    public interface ICountable
    {
        int Total { get; }
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

    interface IProfile: IData
    {
        string FirstName { get; set; }
        string Surname { get; set; }
        string Avatar { get; set; }
        DateTime BirthDate { get; set; }
    }

    public interface IContentBase: IData
    {
        int AuthorID { get; set; }
        IUser Author { get; set; }
    }

    public interface IContent: IContentBase
    {
        string Body { get; set; }
        DateTime PublishedAt { get; set; }
    }

    interface IEstimation : IContentBase
    {        
        bool IsPositive { get; set; }
    }

    public interface ICredentials
    {
        string Token { get; set; }
    }

    public interface IAuthResult: ICredentials
    {
        IUser Bearer { get; set; }
    }

    public interface ISaveResult<T>
    {
        T Value { get; set; }
        IDictionary<string, string> Errors { get; }
    }

    public interface IDeletable
    {
        bool Delete(int id);
    }

    public interface IArticlesService: ICountable, IDeletable, IDisposable
    {
        IEnumerable GetFeed(int page);
        IContent GetByID(int id);
        ISaveResult<IContent> PublishArticle(string text);
        ISaveResult<bool?> Estimate(int id, bool isPositive);
        ISaveResult<IContent> Estimate(int id, IContent comment);
    }

    public interface IUsersService: IDisposable
    {
        IUser GetByID(int id);    
        bool RegisterNew(IUser user);
        IAuthResult Authenticate(string login, string password);
        ISaveResult<IUser> Update(IUser user);
        void Logout();
    }
}