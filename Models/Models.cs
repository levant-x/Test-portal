
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.Interfaces;

namespace Portal.Models
{
    public class Comment : IContent
    {
        public int ID { get; set; }
        public string Body { get; set; }
        public IUser Author { get; set; }
        public DateTime PublishedAt { get; set; }
    }

    public class Article : Comment, IArticle
    {
        public IEnumerable<IContent> Comments { get; set; }
        public int LikesNum { get; set; }
        public int DislikesNum { get; set; }
    }
}