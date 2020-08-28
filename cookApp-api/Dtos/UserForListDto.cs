using System;

namespace cookApp_api.Dtos
{
    public class UserForListDto
    {
         public int Id { get; set; }

        public string UserName { get; set; }

        public int Age { get; set; }

        public string Email { get; set; }

        public DateTime DateCreated { get; set; }

        public int ZipCode { get; set; }

        public string City { get; set; }

        public string Country { get; set; }
        
        public string PhotoUrl { get; set; }
    }
}