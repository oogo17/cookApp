using System;

namespace cookApp_api.Models
{
    public class MarketGroupShopping
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string Section { get; set; }
        public ShoppingMarket ShoppingMarket { get; set; }
        public int ShoppingMarketId { get; set; }
        
    }
}