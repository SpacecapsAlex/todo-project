using LMSystemApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LMSystemApi.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<TodoItem> TodoItems { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users)
            .UsingEntity<UserRole>(
                j => j.HasOne(ur => ur.Role).WithMany().HasForeignKey(ur => ur.RoleId),
                j => j.HasOne(ur => ur.User).WithMany().HasForeignKey(ur => ur.UserId)
            );
    }
}