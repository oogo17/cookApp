using System.Collections.Generic;
using System.Threading.Tasks;
using cookApp_api.Helpers;
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

        Task<Recipe> GetRecipe(int id);

        Task<PagedList<Recipe>> GetRecipes(int id, RecipeParams recipeParams);

        Task<IEnumerable<FollowUser>> GetFollowUsers(int id);
        
        Task<User> GetFollowUsersDetails(int id);

        Task<IEnumerable<FollowUser>> GetFollowedUsers(int id);
        
        Task<IEnumerable<Notification>> GetNotifications(int id);
         
    }
}