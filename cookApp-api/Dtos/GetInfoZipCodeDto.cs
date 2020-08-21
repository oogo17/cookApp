namespace cookApp_api.Dtos
{
    public class GetInfoZipCodeDto
    {
        public string Zip_Code { get; set; }
        public float Lat { get; set; }
        public float Lng { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}