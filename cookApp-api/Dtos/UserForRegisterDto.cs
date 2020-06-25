using System.ComponentModel.DataAnnotations;

namespace cookApp_api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string  UserName { get; set; }
        [Required]
        [StringLength(8,MinimumLength = 4, ErrorMessage = "password must be between 4 and 8 characters.")]
        public string Password { get; set; }
    }
}