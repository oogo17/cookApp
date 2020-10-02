using System;
using System.Collections.Generic;

namespace cookApp_api.Models
{
    public class ShoppingMarket
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public MarketGroupShopping MarketGroupShopping { get; set; }
        public ICollection<ShoppingRecipe> ShoppingRecipe { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }

    }
}