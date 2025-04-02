using Microsoft.EntityFrameworkCore;
using TodoWepApi.Models;

namespace TodoWepApi.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems { get; set; }
}