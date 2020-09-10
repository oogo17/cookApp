using Microsoft.AspNetCore.Routing;

namespace cookApp_api.Helpers
{
    public class NotificationType : NotificationDetails
    {
        public NotificationType(RouteValueDictionary data) : base(data)
        {
        }

        // public override int getNotificationType(string action)
        // {
        //     return int.Parse(action);
        // }
    }
}