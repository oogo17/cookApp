using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace cookApp_api.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public NotificationType NotificationType { get; set; }
        public int NotificationTypeId { get; set; }
        
        [ForeignKey("UserId")]
        [InverseProperty("Notification")]
        public User User { get; set; }
        public int UserId { get; set; }
         
        [ForeignKey("NotifyUserId")]
        public User NotifyUser { get; set; }
        public int NotifyUserId { get; set; }
        public DateTime Created { get; set; }
        public int RecipeId { get; set; }
        public bool Seen { get; set; }
    }
}