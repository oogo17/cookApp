using System;
using System.ComponentModel.DataAnnotations;

namespace cookApp_api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string  UserName { get; set; }

        [Required]
        public DateTime DateofBirth { get; set; }
        
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "password must be between 4 and 8 characters.")]
        public string Password { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            DateCreated = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}