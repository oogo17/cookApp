using System;
using System.Collections.Generic;

namespace cookApp_api.Models
{
    public class Users
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateTime DateofBirth { get; set; }

        public DateTime DateCreated { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public ICollection<Recipe> Recipes { get; set; }

        public ICollection<FollowUser> FollowUsers { get; set; }

    }
}