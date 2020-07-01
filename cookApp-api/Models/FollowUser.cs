using System;

namespace cookApp_api.Models
{
    public class FollowUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string UrlPhoto { get; set; }
        public DateTime DateCreated { get; set; }
        public Users User { get; set; }
        public int UserId { get; set; }
    }
}