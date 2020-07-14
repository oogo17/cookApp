using System;
using System.Collections.Generic;


namespace cookApp_api.Dtos
{
    public class UserForDetailedDto
    {
         public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public int Age { get; set; }

        public DateTime DateCreated { get; set; }

        public string City { get; set; }
        
        public string State { get; set; }

        public string Country { get; set; }

        public string PhotoUrl { get; set; }
        public ICollection<PhotoForDetailedDto> Photos { get; set; }

        public ICollection<RecipeForDetailedDto> Recipes { get; set; }

        public ICollection<FollowUserForDetailedDto> FollowUsers { get; set; }
    }
}