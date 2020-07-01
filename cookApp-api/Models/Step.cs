namespace cookApp_api.Models
{
    public class Step
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }
    }
}