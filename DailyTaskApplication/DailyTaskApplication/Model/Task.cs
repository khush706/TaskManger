using System.ComponentModel.DataAnnotations;

namespace DailyTaskApplication.Model
{
    public class Task
    {
        [Key]
        public int Id { get; set; }

        public string description { get; set; }

        public DateTime created_at { get; set; }
    }
}
