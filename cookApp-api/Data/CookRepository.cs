using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cookApp_api.Dtos;
using cookApp_api.Helpers;
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

        public async Task<IEnumerable<FollowUser>> GetFollowUsers(int id)
        {
           var followUsers = await _context.FollowUser.Where(x => x.UserId == id)
                .ToListAsync();
           
           return followUsers;
        }

        public async Task<IEnumerable<FollowUser>> GetFollowedUsers(int id)
        {
           var followedUsers = await _context.FollowUser.Where(x => x.FollowerId == id)
                .ToListAsync();
           
           return followedUsers;
        }

        public async Task<Recipe> GetRecipe(int id)
        {
            var recipe = await _context.Recipe.Include(x => x.Ingredients)
                                              .Include(x => x.Steps)
                                              .FirstOrDefaultAsync(x => x.Id == id);

            return recipe;
        }

        public async Task<PagedList<Recipe>> GetRecipes(int id, RecipeParams recipeParams)
        {
            var recipes =  _context.Recipe.Where(x => x.UserId == id);

            if(!string.IsNullOrEmpty(recipeParams.Type))
                recipes = recipes.Where(x => x.Type == recipeParams.Type);
            
            if(!string.IsNullOrEmpty(recipeParams.RecipeName))
                recipes = recipes.Where(x => x.Name.Contains(recipeParams.RecipeName));

            return await PagedList<Recipe>.CreateAsync(recipes, recipeParams.PageNumber, recipeParams.PageSize);   
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.User.Include(x => x.Recipes)
                                        .ThenInclude(x => x.Ingredients)
                                     .Include(x => x.Recipes)
                                        .ThenInclude(x => x.Steps)
                                     .Include(x => x.Photos)
                                     .Include(x => x.FollowUsers)
                                     .Include(x => x.Allergy)
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

        public async Task<IEnumerable<Notification>> GetNotifications(int id)
        {
            var notifications = await _context.Notification.Include(x => x.NotificationType)
                            .Where(x => x.NotifyUserId == id).ToListAsync();

            return notifications;
        }

        public async Task<User> GetFollowUsersDetails(int id)
        {
            var userDetails = await _context.User.FirstOrDefaultAsync(x => x.Id == id);


            return userDetails;
        }

        public async Task<IEnumerable<Review>> GetReviews(int id)
        {
            var reviews = await _context.Review.Where(x => x.RecipeId == id).ToListAsync();
            
            return reviews;
        }

        public async Task<bool> AlreadyUserReview(int userId, int recipeId)
        {
           var res = await _context.Review.FirstOrDefaultAsync(x => x.RecipeId == recipeId && x.UserId == userId);
       
            return res != null ? true : false;
        }

        public async Task<IEnumerable<ReviewForDetailGetUserDetailDto>> GetUserDetailForReviews(int[] userIds)
        {
            var reviewDetailDto = new List<ReviewForDetailGetUserDetailDto>();
            foreach (var userId in userIds)
            {
                var reviewDetail = new ReviewForDetailGetUserDetailDto();
                var user = await _context.User.FirstOrDefaultAsync(x => x.Id == userId);
                reviewDetail.Username = user.UserName;
                reviewDetail.PhotoUrl = user.PhotoUrl;
                reviewDetail.Email = user.Email;
                reviewDetailDto.Add(reviewDetail);
                
            }
            return reviewDetailDto;
        }
    }
}