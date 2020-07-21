using Microsoft.AspNetCore.Http;

namespace cookApp_api.Dtos
{
    public class UserForUpdateDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }

        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }

    }
}