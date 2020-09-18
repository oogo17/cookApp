using System;

namespace cookApp_api.Models
{
    public class Review
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public Int16 Rate { get; set; }
        public int UserId { get; set; }
        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
