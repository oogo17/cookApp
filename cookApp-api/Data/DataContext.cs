using cookApp_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cookApp_api.Data
{
    public class DataContext: DbContext
    {

        public DataContext (DbContextOptions<DataContext> options): base (options){}

        public DbSet<Users> Users {get; set;}
        
    }
}