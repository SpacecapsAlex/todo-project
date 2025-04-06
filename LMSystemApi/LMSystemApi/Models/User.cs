using System.ComponentModel.DataAnnotations;

namespace LMSystemApi.Models;

public class User
{
    public int Id { get; set; }
    [StringLength(50)]
    public string Login { get; set; } = string.Empty;
    [StringLength(100)]
    public string PasswordHash { get; set; } = string.Empty;
}