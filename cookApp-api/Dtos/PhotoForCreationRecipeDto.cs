using System;
using Microsoft.AspNetCore.Http;

namespace cookApp_api.Dtos
{
    public class PhotoForCreationRecipeDto
    {
         public string PhotoUrl { get; set; }
        public IFormFile File { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public PhotoForCreationRecipeDto()
        {
            DateAdded = DateTime.Now; 
        }
        
    }
}