using System;
using System.Collections.Generic;

namespace cookApp_api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<Ingredient> Ingredients { get; set; }
        public ICollection<Step> Steps { get; set; }
        public string Tips { get; set; }
        public Boolean allowShare { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}