namespace cookApp_api.Dtos
{
    public class UpdatePasswordHashSaltForUser
    {
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}