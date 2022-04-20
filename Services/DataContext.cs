using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Portal.Models;

namespace Portal.Services
{
    public class DataContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>()
                .HasOne(article => (User)article.Author);
            modelBuilder.Entity<Article>()
                .HasMany(article => (List<Estimation>)article.Estimations);

            modelBuilder.Entity<Comment>()
                .HasOne(comment => (User)comment.Author);
            modelBuilder.Entity<Estimation>()
                .HasOne(estimation => (User)estimation.Author);
            modelBuilder.Entity<User>()
                .HasOne(user => (Profile)user.Profile);
        }
    }
}