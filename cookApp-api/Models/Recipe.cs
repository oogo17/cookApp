using System;
using System.Collections.Generic;

namespace cookApp_api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<Ingridient> Ingridients { get; set; }
        public ICollection<Step> Steps { get; set; }
        public string Tips { get; set; }
        public Boolean allowShare { get; set; }
        public Users User { get; set; }
        public int UserId { get; set; }
    }
}