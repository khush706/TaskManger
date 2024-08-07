using DailyTaskApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace DailyTaskApplication.Controllers
{
    [Route("api")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private TaskDbContext _context;
        public TaskController(TaskDbContext context) { 
            _context = context;
        }

        [HttpGet]
        [Route("getTasks")]
        public IActionResult GetTask() {
            var list = _context.Task.ToList();

            return Ok(JsonSerializer.Serialize(list));
        }

        [HttpPost]
        [Route("addTask")]
        public async Task<IActionResult> AddTask(string description)
        {
            if (description == null) return BadRequest();

            Model.Task task = new Model.Task();
            task.created_at = DateTime.Now;
            task.description = description;

            var result = await _context.Task.AddAsync(task);
            if (result.State == EntityState.Added)
            {
                await _context.SaveChangesAsync();
                return Ok(JsonSerializer.Serialize("Task Added Successfully"));
            } else
            {
                return StatusCode(500);
            }
        }

        [HttpDelete]
        [Route("deleteTask")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _context.Task.Where(x=> x.Id == id).ExecuteDeleteAsync();
            if (result == 0)
            {
                return NotFound();
            } else
            {
                await _context.SaveChangesAsync();

                return Ok(JsonSerializer.Serialize("Task Deleted Successfully"));
            }
        }
    }
}
