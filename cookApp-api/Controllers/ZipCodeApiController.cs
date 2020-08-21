using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using cookApp_api.Dtos;

namespace cookApp_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ZipCodeApiController: ControllerBase
    {

        [HttpGet("{id}")]
        public async Task<IActionResult> GetZipCodeInfo(int id)
        {
          var keyZipCode = "5EcwVO4da7z5h2PQR3JpMvUVbIqcpqMI3u2YwxJGWuQnm4KFasEvGMOCpheklVBD";
          var api = string.Format("https://www.zipcodeapi.com/rest/{0}/info.json/{1}/radians",keyZipCode, id);
            
            GetInfoZipCodeDto info = new GetInfoZipCodeDto();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(api))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    info = JsonConvert.DeserializeObject<GetInfoZipCodeDto>(apiResponse);
                }
            }
 
            return Ok(info);
        }
        
        
    }
}