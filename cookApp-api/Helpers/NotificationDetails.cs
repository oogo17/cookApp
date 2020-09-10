using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Routing;

namespace cookApp_api.Helpers
{
    public class NotificationDetails
    {
        public int EntityId { get; set; }
        public string Entity { get; set; }
        public int NotificationType { get; set; }

        public NotificationDetails(RouteValueDictionary data)
        {
            EntityId = int.Parse(data["id"].ToString());
            Entity = data["controller"].ToString();
            NotificationType = getNotificationType(data["action"].ToString());
            
        }
        private int getNotificationType(string action) {
         if(action == "UpdateRecipe") {
            return 2;
         }
         return 0;
        }

        
    }
}