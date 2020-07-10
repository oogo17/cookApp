using System.Collections.Generic;
using System.Threading.Tasks;
using cookApp_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cookApp_api.Data
{
    public class CookRepository : ICookRepository
    {
        private readonly DataContext _context;
        public CookRepository(DataContext context)
        {
            _context = context;


        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Recipe> GetRecipe(int id)
        {
            var recipe = await _context.Recipe.Include(x => x.Ingredients)
                                              .Include(x => x.Steps)
                                              .FirstOrDefaultAsync(x => x.Id == id);

            return recipe;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.User.Include(x => x.Recipes)
                                        .ThenInclude(x => x.Ingredients)
                                     .Include(x => x.Recipes)
                                        .ThenInclude(x => x.Steps)
                                     .Include(x => x.Photos)
                                     .Include(x => x.FollowUsers)
                                     .FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           var users = await _context.User.Include(x => x.Photos)
                                           .Include(x => x.Recipes)
                                           .Include(x => x.FollowUsers).ToListAsync();

           return users;
        }

        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() > 0;
        }
    }
}