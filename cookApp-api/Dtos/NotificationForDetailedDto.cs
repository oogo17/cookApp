using System;

namespace cookApp_api.Dtos
{
    public class NotificationForDetailedDto
    {
      
        public int NotificationTypeId { get; set; }
        public string Description { get; set; }
        public string Entity { get; set; }
        public int UserId { get; set; }
        public int NotifyUserId { get; set; }
        public DateTime Created { get; set; }
        public int RecipeId { get; set; }
        public bool Seen { get; set; }
        
    }
}