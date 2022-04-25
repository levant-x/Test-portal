
using System.Collections.Generic;
using System.Linq;
using Portal.Interfaces;
using Portal.Models;
using System;
using System.Collections;
using Portal.Attributes;
using Microsoft.AspNetCore.Http;
using Portal.Helpers;

namespace Portal.Services
{
    [AuthorizeAttribute]
    public class ArticlesService : IArticlesService
    {
        protected readonly DataContext dataContext;
        protected readonly HttpContext httpContext;

        protected const int LIMIT = 10;
        protected const int EXCERPT_LEN = 300;

        public int Total 
        { 
            get { return dataContext.Articles.Count(); }    
        }

        public ArticlesService(DataContext dataContext, IHttpContextAccessor context)
        {
            this.dataContext = dataContext;
            this.httpContext = context.HttpContext;
        }

        public IEnumerable GetFeed(int page)
        {
            var result = dataContext.Articles
                .OrderByDescending(article => article.PublishedAt.Date)
                .Skip((page - 1) * LIMIT)
                .Take(LIMIT)
                .Select(article => new {
                    ID = article.ID,
                    Body = article.Body.Substring(0, EXCERPT_LEN),
                    Author = article.Author,                    
                    PublishedAt = article.PublishedAt.ToUniversalTime(),
                    LikesNum = article.Estimations.Count(e => e.IsPositive),
                    DislikesNum = article.Estimations.Count(e => !e.IsPositive),
                    CommentsNum = article.Comments.Count()
                });
            return result;
        }

        public IContent GetByID(int id)
        {
            throw new System.NotImplementedException();
        }

        public ISaveResult PublishArticle(string text)
        {
            var article = dataContext.Articles.Add(new Article()
            {
                Body = text,
                PublishedAt = DateTime.Now,
                AuthorID = ((User)httpContext.Items[AppConfig.USER_KEY]).ID,
            }).Entity;

            dataContext.SaveChanges();        
            // article.PublishedAt = article.PublishedAt.ToUniversalTime(); 
            return new SaveResultVM()
            {
                Entity = article,
            };
        }

        public void Dispose()
        {
            dataContext.Dispose();
        }
    }
}