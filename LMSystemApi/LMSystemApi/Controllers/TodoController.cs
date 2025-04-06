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