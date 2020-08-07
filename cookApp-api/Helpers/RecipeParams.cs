namespace cookApp_api.Helpers
{
    public class RecipeParams
    {
        private const int MaxPageSize = 20;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 6;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize)? MaxPageSize : value; }
        }
        public int MaxTime { get; set; }
        public string Type { get; set; }
        public string RecipeName { get; set; }

        
    }
}