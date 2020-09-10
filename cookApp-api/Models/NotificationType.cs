using System;

namespace cookApp_api.Models
{
    public class NotificationType
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Entity { get; set; }
        public DateTime Created { get; set; }
    }
}