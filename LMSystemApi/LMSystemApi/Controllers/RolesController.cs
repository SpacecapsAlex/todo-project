using LMSystemApi.Data;
using LMSystemApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSystemApi.Controllers;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/[controller]")]
public class RolesController(ApplicationDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateRole(string roleName)
    {
        if (await context.Roles.AnyAsync(r => r.Name == roleName))
            return BadRequest("Role already exists");

        var role = new Role { Name = roleName };
        context.Roles.Add(role);
        await context.SaveChangesAsync();

        return Ok(role);
    }

    [HttpPost("assign-role")]
    public async Task<IActionResult> AssignRole(int userId, int roleId)
    {
        var user = await context.Users.FindAsync(userId);
        var role = await context.Roles.FindAsync(roleId);

        if (user == null || role == null)
            return NotFound("User or role not found");

        user.Roles.Add(role);
        await context.SaveChangesAsync();

        return Ok("Role assigned successfully");
    }
}