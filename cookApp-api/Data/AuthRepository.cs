using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cookApp_api.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cookApp_api.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.UserName == username);
           
            if (user == null)
             return null;

            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt))
             return null;

             return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using ( var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
           {
            
            var hashComputed = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < hashComputed.Length; i++)
                {
                    if(hashComputed[i] != passwordHash[i])
                    return false;
                }

           }
           return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt; 

            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash( string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
           using ( var hmac = new System.Security.Cryptography.HMACSHA512())
           {
               passwordSalt = hmac.Key;
               passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

           }
        }

        public async Task<bool> UserExists(string username)
        {
           if( await _context.User.AnyAsync(x => x.UserName == username))
            return true;

            return false;
        }
    }
}