namespace cookApp_api.Models
{
    public class Allergy
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}