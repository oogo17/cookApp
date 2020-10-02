using System;
using System.Collections.Generic;

namespace cookApp_api.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateTime DateofBirth { get; set; }

        public DateTime DateCreated { get; set; }

        public string PhotoUrl { get; set; }

        public string PublicId { get; set; }

        public int ZipCode { get; set; }
        
        public string City { get; set; }
        
        public string State { get; set; }

        public string Country { get; set; }
        
        public ShoppingMarket ShoppingMarket { get; set; }

        public ICollection<Allergy> Allergy { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public ICollection<Recipe> Recipes { get; set; }

        public ICollection<FollowUser> FollowUsers { get; set; }

        public ICollection<Notification> Notification { get; set; }

    }
}