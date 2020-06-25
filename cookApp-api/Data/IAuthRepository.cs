using System.Threading.Tasks;
using cookApp_api.Models;

namespace cookApp_api.Data
{
    public interface IAuthRepository
    {
         Task<Users> Register (Users user , string password);
         Task<Users> Login (string username, string password);
         Task<bool> UserExists (string username);
    }
}