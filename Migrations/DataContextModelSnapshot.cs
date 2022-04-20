﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Portal.Services;

namespace InnoPortal.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("Portal.Models.Article", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AuthorID")
                        .HasColumnType("int");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("PublishedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("Portal.Models.Comment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ArticleID")
                        .HasColumnType("int");

                    b.Property<int?>("AuthorID")
                        .HasColumnType("int");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("PublishedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("ID");

                    b.HasIndex("ArticleID");

                    b.HasIndex("AuthorID");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("Portal.Models.Estimation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("ArticleID")
                        .HasColumnType("int");

                    b.Property<int?>("ArticleID1")
                        .HasColumnType("int");

                    b.Property<int?>("AuthorID")
                        .HasColumnType("int");

                    b.Property<bool>("IsPositive")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("ID");

                    b.HasIndex("ArticleID");

                    b.HasIndex("ArticleID1");

                    b.HasIndex("AuthorID");

                    b.ToTable("Estimation");
                });

            modelBuilder.Entity("Portal.Models.Profile", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Avatar")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Profile");
                });

            modelBuilder.Entity("Portal.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EMail")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("ProfileID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("EMail")
                        .IsUnique();

                    b.HasIndex("Phone")
                        .IsUnique();

                    b.HasIndex("ProfileID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Portal.Models.Article", b =>
                {
                    b.HasOne("Portal.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Portal.Models.Comment", b =>
                {
                    b.HasOne("Portal.Models.Article", "Article")
                        .WithMany("Comments")
                        .HasForeignKey("ArticleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Portal.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorID");

                    b.Navigation("Article");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Portal.Models.Estimation", b =>
                {
                    b.HasOne("Portal.Models.Article", "Article")
                        .WithMany()
                        .HasForeignKey("ArticleID");

                    b.HasOne("Portal.Models.Article", null)
                        .WithMany("Estimations")
                        .HasForeignKey("ArticleID1");

                    b.HasOne("Portal.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorID");

                    b.Navigation("Article");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Portal.Models.Profile", b =>
                {
                    b.HasOne("Portal.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Portal.Models.User", b =>
                {
                    b.HasOne("Portal.Models.Profile", "Profile")
                        .WithMany()
                        .HasForeignKey("ProfileID");

                    b.Navigation("Profile");
                });

            modelBuilder.Entity("Portal.Models.Article", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Estimations");
                });
#pragma warning restore 612, 618
        }
    }
}
