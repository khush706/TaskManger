using Microsoft.EntityFrameworkCore;

namespace DailyTaskApplication.Model
{
    public class TaskDbContext: DbContext
    {
        public TaskDbContext(DbContextOptions
       <TaskDbContext> options)
           : base(options)
        {
        }

        public virtual DbSet<Task> Task { get; set; }
    }
}
