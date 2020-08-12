using System;

namespace cookApp_api.Dtos
{
    public class FallowUserForCreateDto
    {
         public string Username { get; set; }
        public string UrlPhoto { get; set; }
        public string PublicId { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
    }
}