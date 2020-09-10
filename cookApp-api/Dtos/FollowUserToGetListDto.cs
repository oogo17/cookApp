using System;

namespace cookApp_api.Dtos
{
    public class FollowUserToGetListDto
    {
         public string Username { get; set; }
        public string UrlPhoto { get; set; }
        public string PublicId { get; set; }
         public DateTime DateCreated { get; set; }
        public int FollowerId { get; set; }
        
    }
}