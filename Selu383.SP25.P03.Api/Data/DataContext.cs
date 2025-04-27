using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Features.Users;
using Selu383.SP25.P03.Api.Features.Theaters;
using Selu383.SP25.P03.Api.Features.Movies;
using Selu383.SP25.P03.Api.Features.Tickets;
using System.Net.Sockets;
using Selu383.SP25.P03.Api.Features.Screens;

namespace Selu383.SP25.P03.Api.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Theater> Theaters { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieShowtime> MovieShowtimes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Screen> Screens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Set up a composite primary key for the UserRole table
            builder.Entity<UserRole>().HasKey(x => new { x.UserId, x.RoleId });
            builder.Entity<User>()
                .HasMany(e => e.UserRoles)
                .WithOne(x => x.User)
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Role>()
                .HasMany(e => e.UserRoles)
                .WithOne(x => x.Role)
                .HasForeignKey(x => x.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Set up relationships for Screen, Theater, and Movie
            builder.Entity<Screen>()
                .HasOne(s => s.Theater)
                .WithMany(t => t.Screens) // Assuming a theater can have many screens
                .HasForeignKey(s => s.TheaterId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade); // Deleting a theater deletes its screens

            builder.Entity<Screen>()
                .HasOne(s => s.Movie)
                .WithMany(m => m.Screens) // Assuming a movie can be shown in many screens
                .HasForeignKey(s => s.MovieId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade); // Deleting a movie deletes its screens
            builder.Entity<Feedback>()
                .HasOne(f => f.Movie)
                .WithMany()
                .HasForeignKey(f => f.MovieId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
