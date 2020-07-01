using System.Threading.Tasks;
using cookApp_api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cookApp_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ICookRepository _repo;
        public UsersController(ICookRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers () {
            var users = await  _repo.GetUsers();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser (int id) {
            var user = await _repo.GetUser(id);
            return Ok(user);
        }

        


    }
}