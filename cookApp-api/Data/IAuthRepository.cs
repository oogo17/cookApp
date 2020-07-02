using System.Threading.Tasks;
using cookApp_api.Models;

namespace cookApp_api.Data
{
    public interface IAuthRepository
    {
         Task<User> Register (User user , string password);
         Task<User> Login (string username, string password);
         Task<bool> UserExists (string username);
    }
}