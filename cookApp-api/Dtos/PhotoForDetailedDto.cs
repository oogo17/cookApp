using System;

namespace cookApp_api.Dtos
{
    public class PhotoForDetailedDto
    {
         public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateCreated { get; set; }
        public Boolean IsMain { get; set; }
        
    }
}