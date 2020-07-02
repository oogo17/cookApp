
namespace cookApp_api.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string Mesure { get; set; }
        public string Name { get; set; }
        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }
    }
}