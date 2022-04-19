
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
        private static IEnumerable<IArticle> _mockArtInfos;

        protected const int LIMIT = 10;
        protected const int EXCERPT_LEN = 300;

        public int Total 
        { 
            get { return _mockArtInfos.Count(); }    
            set { }
        }

        static ArticlesService()
        {
            var hrs = 60 * 24;
            var mocksList = new List<IArticle>();
            for (int i = 0; i < MockDataGen.GenNum(20); i++)
            {
                mocksList.Add(new Article()
                {
                    ID = i + 1,
                    Body = MockDataGen.GenText(40, 120),
                    Comments = (IEnumerable<IContent>)Array.CreateInstance(typeof(Comment),
                        MockDataGen.GenNum(0, 10)),
                    LikesNum = MockDataGen.GenNum(0, 150),
                    DislikesNum = MockDataGen.GenNum(0, 150),
                    PublishedAt = DateTime.Now.AddDays(MockDataGen.GenNum(-30, 30))
                        .AddMinutes(MockDataGen.GenNum(-hrs, hrs)),
                });
            }
            _mockArtInfos = mocksList;
        }

        public IEnumerable GetFeed(int page)
        {
            var result = _mockArtInfos
                .OrderByDescending(article => article.PublishedAt.Date)
                .Skip((page - 1) * LIMIT)
                .Take(LIMIT)
                .Select(article => new {
                    ID = article.ID,
                    Body = article.Body.Substring(0, EXCERPT_LEN),
                    PublishedAt = article.PublishedAt.ToString("MM.dd.yyyy HH:mm:ss"),
                    LikesNum = article.LikesNum,
                    DislikesNum = article.DislikesNum,
                    CommentsNum = article.Comments.Count()
                });
            return result;
        }

        public IArticle GetArticle(int id)
        {
            throw new System.NotImplementedException();
        }

        public int PublishArticle(string text)
        {
            throw new System.NotImplementedException();
        }
    }
}