using cookApp_api.Models;

namespace cookApp_api.Helpers
{
    public interface IEmailSender
    {
          void SendEmail(Message message);
    }
}