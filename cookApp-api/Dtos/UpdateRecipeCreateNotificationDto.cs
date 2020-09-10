using System;

namespace cookApp_api.Dtos
{
    public class UpdateRecipeCreateNotificationDto
    {
        
        public int NotificationTypeId { get; set; }
        public int UserId { get; set; }
         public int NotifyUserId { get; set; }
         public DateTime Created { get; set; }
        public int RecipeId { get; set; }
        public bool Seen { get; set; }
    }
}