
using System;
using System.Collections.Generic;
using Portal.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Portal.Models
{
    public abstract class AuthModel
    {
        [Required(ErrorMessage = "Поле обязательно")]
        [DataType(DataType.Password)]
        [MinLength(4)]
        [Display(Prompt = "Пароль")]
        [JsonIgnore]
        public string Password { get; set; }
    }

    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(Phone), IsUnique = true)]
    public class User: AuthModel, IUser
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [EmailAddress]
        [Display(Prompt = "EMail")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [Phone]
        [Display(Prompt = "Номер телефона")]
        public string Phone { get; set; }

        public Profile Profile { get; set; }
    }

    public class Profile : IProfile
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [Display(Prompt = "Имя")]
        [StringLength(20, MinimumLength = 2)]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [Display(Prompt = "Фамилия")]
        [StringLength(20, MinimumLength = 2)]
        public string Surname { get; set; }
        public string Avatar { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [Range(typeof(DateTime), "1/1/2000", "1/1/2018")]
        [Display(Prompt = "Дата рождения")]
        public DateTime BirthDate { get; set; }

        [ForeignKey("UserID")]
        public User User { get; set; }
    }

    public class Estimation : IEstimation
    {
        public int ID { get; set; }
        public bool IsPositive { get; set; }
        public int AuthorID { get; set; }
        public int ArticleID { get; set; }

        [Required(ErrorMessage = "Поле обязательно")]
        public IUser Author { get; set; }    
        [Required(ErrorMessage = "Поле обязательно")]
        public Article Article { get; set; }
    }

    public class Comment : IContent
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [Range(2, 255)]
        public string Body { get; set; }
        public DateTime PublishedAt { get; set; }   

        [Required(ErrorMessage = "Поле обязательно")]
        [ForeignKey("AuthorID")]
        public IUser Author { get; set; }  
        [Required(ErrorMessage = "Поле обязательно")]  
        [ForeignKey("ArticleID")]
        public Article Article { get; set; }
    }

    public class Article : IContent
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        [Range(50, 1042)]
        public string Body { get; set; }
        [Required(ErrorMessage = "Поле обязательно")]
        public DateTime PublishedAt { get; set; }   

        [Required(ErrorMessage = "Поле обязательно")]
        public IUser Author { get; set; }    
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Estimation> Estimations { get; set; }
    }
}