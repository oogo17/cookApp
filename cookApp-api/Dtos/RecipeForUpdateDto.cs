using System;
using System.Collections.Generic;

namespace cookApp_api.Dtos
{
    public class RecipeForUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int Persons { get; set; }
        public string PhotoUrl { get; set; }
        public string BuyIngredients { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<IngredientForUpdateDto> Ingredients { get; set; }
        public ICollection<StepForUpdateDto> Steps { get; set; }
        public int Time { get; set; }
        public string Tips { get; set; }
        public Boolean allowShare { get; set; }
        
    }
}