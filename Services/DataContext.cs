using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Portal.Models;

namespace Portal.Services
{
    public class DataContext: DbContext
    {
        private List<int> _estims = new List<int>();

        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(user => (Profile)user.Profile)
                .WithOne(profile => (User)profile.User);
            modelBuilder.Entity<Comment>()
                .HasOne(comment => (User)comment.Author);
            modelBuilder.Entity<Estimation>()
                .HasOne(estimation => (User)estimation.Author);

            modelBuilder.Entity<Article>()
                .HasOne(article => (User)article.Author);
            _TestSeed(modelBuilder);
        }

        private void _TestSeed(ModelBuilder modelBuilder)
        {
            _SeedUsers(modelBuilder);
            _SeedArticles(modelBuilder);
        }

        private void _SeedUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(_GenItems(5, id => new User() 
            {
                ID = id,
                EMail = $"{id}@mail.org",
                Phone = $"8000000000{id}",
                Password = "0000"                
            }));
            modelBuilder.Entity<Profile>().HasData(_GenItems(5, id => new  
            {
                ID = id,
                UserID = id,
                FirstName = MockDataGen.GenString(2, 20, true),
                Surname = MockDataGen.GenString(2, 20, true),
                BirthDate = DateTime.Parse("1/1/2009").AddDays(MockDataGen.GenNum(0, 365 * 9))
            }));
        }

        private void _SeedArticles(ModelBuilder modelBuilder)
        {
            var artsNum = 0;      
            modelBuilder.Entity<Article>().HasData(_GenItems(MockDataGen.GenNum(15, 40), id => 
            {
                artsNum = id;
                return new 
                {
                    ID = id,
                    Body = MockDataGen.GenText(10, 51),
                    PublishedAt = DateTime.Now.AddMinutes(-5 * MockDataGen.GenNum(0, 60 * 24)),
                    AuthorID = MockDataGen.GenNum(1, 6),                    
                };
            }));
            _SeedRest(modelBuilder, artsNum);            
        }

        private void _SeedRest(ModelBuilder modelBuilder, int artsNum)
        {
            modelBuilder.Entity<Comment>().HasData(_GenItems(artsNum * 2 / 3, id => new 
            {
                ID = id,
                Body = MockDataGen.GenText(3, 12),
                PublishedAt = DateTime.Now.AddMinutes(-5 * MockDataGen.GenNum(0, 60 * 24)),
                ArticleID = MockDataGen.GenNum(1, artsNum),
                AuthorID = MockDataGen.GenNum(1, 6)    
            }));

            modelBuilder.Entity<Estimation>().HasData(_GenItems(artsNum * 6 / 8, id => 
            {
                var target = _TargetEstim(artsNum);
                return new 
                {
                    ID = id,
                    IsPositive = MockDataGen.GenNum(0, 2) == 0 ? false : true,
                    ArticleID = target / 10,
                    AuthorID = target % 10  
                };
            }));
        }

        private List<object> _GenItems(int num, Func<int, object> create)
        {
            var items = new List<object>(num);
            for (int i = 0; i < num; i++) items.Add(create(i + 1));
            return items;
        }

        private int _TargetEstim(int artsNum)
        {
            var max = artsNum * 10 + 6;
            var target = MockDataGen.GenNum(11, max);
            
            while (_estims.Contains(target) || target % 10 == 0 ||
                target % 10 > 5 && target % 10 <= 9) target++;
            _estims.Add(target);
            return target;
        }
    }
}