using cookApp_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cookApp_api.Data
{
    public class DataContext: DbContext
    {

        public DataContext (DbContextOptions<DataContext> options): base (options){}

        public DbSet<Users> Users {get; set;}

        public DbSet<Photo> Photo { get; set; }
        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<Ingridient> Ingridient { get; set; }
        public DbSet<Step> Step { get; set; }
        public DbSet<FollowUser> FollowUser { get; set; }
        
    }
}