using System;
using System.Collections.Generic;

namespace cookApp_api.Dtos
{
    public class RecipeForDetailedDto
    {
       public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<IngredientForDetailedDto> Ingredients { get; set; }
        public ICollection<StepForDetailedDto> Steps { get; set; }
        public string Tips { get; set; }
        public Boolean allowShare { get; set; }
    }
}