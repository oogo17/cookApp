using System;

namespace cookApp_api.Dtos
{
    public class ReviewForDetailDto
    {
        public DateTime Created { get; set; }
        public Int16 Rate { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public int RecipeId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        
    }
}