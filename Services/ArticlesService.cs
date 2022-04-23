
using System.Collections.Generic;
using System.Linq;
using Portal.Interfaces;
using Portal.Models;
using System;
using System.Collections;

namespace Portal.Services
{
    public class ArticlesService : IArticlesService
    {
        protected readonly DataContext dataContext;

        protected const int LIMIT = 10;
        protected const int EXCERPT_LEN = 300;

        public int Total 
        { 
            get { return dataContext.Articles.Count(); }    
            set { }
        }

        public ArticlesService(DataContext dataContext)
        {
            this.dataContext = dataContext;
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
                    PublishedAt = article.PublishedAt.ToString("MM.dd.yyyy HH:mm"),
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

        public int PublishArticle(string text)
        {
            throw new System.NotImplementedException();
        }
    }
}