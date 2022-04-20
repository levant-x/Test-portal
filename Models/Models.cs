
using System;
using System.Collections.Generic;
using Portal.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Portal.Models
{
    [Index(nameof(EMail), IsUnique = true)]
    [Index(nameof(Phone), IsUnique = true)]
    public class User : IUser
    {
        public int ID { get; set; }
        [Required]
        [EmailAddress]
        public string EMail { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [Required]
        [MinLength(4)]
        public string Password { get; set; }

        public IProfile Profile { get; set; }
        // public ICollection<Article> Articles { get; set; }
    }

    public class Profile : IProfile
    {
        public int ID { get; set; }
        [Required]
        [Range(2, 20)]
        public string FirstName { get; set; }
        [Required]
        [Range(2, 20)]
        public string Surname { get; set; }
        public string Avatar { get; set; }
        [Required]
        [Range(typeof(DateTime), "1/1/2000", "1/1/2018")]
        public DateTime BirthDate { get; set; }

        [Required]
        public User User { get; set; }
    }

    public class Estimation : IEstimation
    {
        public int ID { get; set; }
        public bool IsPositive { get; set; }

        [Required]
        public IUser Author { get; set; }    
        [Required]
        public Article Article { get; set; }
    }

    public class Comment : IContent
    {
        public int ID { get; set; }
        [Required]
        [Range(2, 255)]
        public string Body { get; set; }
        public DateTime PublishedAt { get; set; }   

        [Required]
        public IUser Author { get; set; }  
        [Required]  
        public Article Article { get; set; }
    }

    public class Article : IContent
    {
        public int ID { get; set; }
        [Required]
        [Range(50, 1042)]
        public string Body { get; set; }
        [Required]
        public DateTime PublishedAt { get; set; }   

        [Required]
        [ForeignKey("AuthorID")]
        public IUser Author { get; set; }    
        public ICollection<Comment> Comments { get; set; }
        public ICollection<IEstimation> Estimations { get; set; }
    }
}