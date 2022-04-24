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
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
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
        }
    }
}