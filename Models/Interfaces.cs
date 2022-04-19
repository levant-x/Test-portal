using System;
using System.Collections;
using System.Collections.Generic;

namespace Portal.Interfaces
{
    public interface ICountable
    {
        public int Total { get; set; }
    }

    public interface IData
    {
        int ID { get; set; }
    }

    public interface IUser: IData
    {
        string Name { get; set; }
    }

    public interface IContent: IData
    {
        IUser Author { get; set; }
        string Body { get; set; }
        DateTime PublishedAt { get; set; }
    }

    public interface ILikeable
    {
        int LikesNum { get; set; }
        int DislikesNum { get; set; }
    }

    public interface IArticle: IContent, ILikeable
    {
        IEnumerable<IContent> Comments { get; set; }        
    }

    public interface IArticleInfo: IContent, ILikeable
    {
        int CommentsNum { get; }
    }

    public interface IArticlesService: ICountable
    {
        IEnumerable GetFeed(int page);
        IArticle GetArticle(int id);
        int PublishArticle(string text);
    }
}