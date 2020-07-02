using System.Collections.Generic;
using System.Threading.Tasks;
using cookApp_api.Models;

namespace cookApp_api.Data
{
    public interface ICookRepository
    {
        void Add<T> (T entity) where T: class;

        void Delete<T> (T entity) where T: class;

        Task<bool> SaveAll();

        Task<IEnumerable<User>> GetUsers();

        Task<User> GetUser(int id);
         
    }
}