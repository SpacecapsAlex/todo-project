using System.Security.Claims;
using LMSystemApi.Data;
using LMSystemApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSystemApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TodoController(ApplicationDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        return await context.TodoItems.ToListAsync();
    }
    
    [HttpGet("my-roles")]
    public async Task<ActionResult<List<string>>> GetMyRoles()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            return Unauthorized("Invalid token");

        var user = await context.Users
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
            return NotFound("User not found");

        return user.Roles.Select(r => r.Name).ToList();
    }
    
    [HttpGet("{id:long}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
        var item = await context.TodoItems.FindAsync(id);
        if (item == null)
            return NotFound();
        return item;
    }
    
    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem item)
    {
        context.TodoItems.Add(item);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
    }
    
    [HttpPut("{id:long}")]
    public async Task<IActionResult> UpdateTodoItem(long id, TodoItem item)
    {
        if (id != item.Id)
            return BadRequest();
        
        context.Entry(item).State = EntityState.Modified;
        
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!context.TodoItems.Any(e => e.Id == id))
                return NotFound();
            throw;
        }
        
        return NoContent();
    }
    
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
        var item = await context.TodoItems.FindAsync(id);
        if (item == null)
            return NotFound();
        
        context.TodoItems.Remove(item);
        await context.SaveChangesAsync();
        
        return NoContent();
    }
}