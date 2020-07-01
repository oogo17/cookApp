using System;
using System.Collections.Generic;
using cookApp_api.Models;

namespace cookApp_api.Dtos
{
    public class UserForDetailedDto
    {
         public int Id { get; set; }

        public string UserName { get; set; }

        public int Age { get; set; }

        public DateTime DateCreated { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string PhotoUrl { get; set; }
        public ICollection<PhotoForDetailedDto> Photos { get; set; }
    }
}