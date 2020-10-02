namespace cookApp_api.Models
{
    public class ShoppingRecipe
    {
        public int Id { get; set; }
        public ShoppingMarket ShoppingMarket { get; set; }
        public int ShoppingMarketId { get; set; }
        public Recipe Recipe { get; set; }
        public int RecipeId { get; set; }
        
    }
}