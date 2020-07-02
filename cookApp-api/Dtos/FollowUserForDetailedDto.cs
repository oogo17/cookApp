using System;

namespace cookApp_api.Dtos
{
    public class FollowUserForDetailedDto
    {
       public int Id { get; set; }
        public string Username { get; set; }
        public string UrlPhoto { get; set; }
        public DateTime DateCreated { get; set; }
        
    }
}