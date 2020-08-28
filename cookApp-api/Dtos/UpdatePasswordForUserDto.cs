namespace cookApp_api.Dtos
{
    public class UpdatePasswordForUserDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}