using LMSystemApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LMSystemApi.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems { get; set; }
}