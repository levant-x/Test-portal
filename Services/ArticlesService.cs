
using System.Linq;
using Portal.Interfaces;
using Portal.Models;
using System;
using System.Collections;
using Portal.Attributes;
using Microsoft.AspNetCore.Http;
using Portal.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Portal.Services
{
    [AuthorizeAttribute]
    public class ArticlesService : IArticlesService
    {
        protected readonly DataContext dataContext;
        protected readonly User user;

        public int Total 
        { 
            get { return dataContext.Articles.Count(); }    
        }

        public ArticlesService(DataContext dataContext, IHttpContextAccessor context)
        {
            this.dataContext = dataContext;
            this.user = (User)context.HttpContext.Items[AppConfig.USER_KEY];
        }

        public IEnumerable GetFeed(int page)
        {
            var articles = from article in (
                from article in dataContext.Articles
                orderby article.PublishedAt descending select article)
                .Skip((page - 1) * AppConfig.LIMIT)
                .Take(AppConfig.EXCERPT_LEN) 
                select new 
                {
                    ID = article.ID,
                    Body = article.Body.Substring(0, AppConfig.EXCERPT_LEN),
                    Author = article.Author,                    
                    PublishedAt = article.PublishedAt.ToUniversalTime(),       
                    CanBeEstimated = article.AuthorID != user.ID,          
                    Estimation = (from estim in article.Estimations where estim
                        .AuthorID == user.ID select (bool?)estim.IsPositive)
                        .SingleOrDefault(),                        
                    LikesNum = article.Estimations.Count(estim => estim.IsPositive),
                    DislikesNum = article.Estimations.Count(estim => !estim.IsPositive),
                    CommentsNum = article.Comments.Count(),
                };
            var result = articles.ToList();
            return result;
        }

        public IContent GetByID(int id)
        {
            throw new System.NotImplementedException();
        }

        public ISaveResult<IContent> PublishArticle(string text)
        {
            var article = dataContext.Articles.Add(new Article()
            {
                Body = text,
                PublishedAt = DateTime.Now,
                AuthorID = user.ID,
            }).Entity;

            dataContext.SaveChanges();        
            return new SaveResultVM<IContent>()
            {
                Value = article,
            };
        }

        public ISaveResult<bool?> Estimate(int id, bool isPositive)
        {
            var article = dataContext.Articles
                .Include(article => article.Estimations)
                .SingleOrDefault(article => article.ID == id);
            if (article.AuthorID == user.ID) return null;

            var estimation = article.Estimations.SingleOrDefault(estim => estim.AuthorID == user.ID);
            if (estimation == null) estimation = dataContext.Estimation.Add(new Estimation()
            {
                AuthorID = user.ID,
                ArticleID = id,
                IsPositive = isPositive,
            }).Entity;
            else if (estimation.IsPositive == isPositive) 
            {
                dataContext.Estimation.Remove(estimation);
                estimation = null;
            }
            else 
            {
                estimation.IsPositive = isPositive;
                estimation = dataContext.Update(estimation).Entity;
            }
            
            dataContext.SaveChanges();
            return new SaveResultVM<bool?>() // new summary to be updated with a socket ..
            {
                Value = estimation?.IsPositive,
            };
        }

        public ISaveResult<IContent> Estimate(int id, IContent comment)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            dataContext.Dispose();
        }
    }
}