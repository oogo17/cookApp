using System;

namespace cookApp_api.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateCreated { get; set; }
        public Boolean IsMain { get; set; }
        public Users User { get; set; }
        public int UserId { get; set; }
    }
}