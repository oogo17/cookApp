using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using cookApp_api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cookApp_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FollowUsersController : ControllerBase
    {
        private readonly ICookRepository _repo;
        private readonly IMapper _mapper;
        public FollowUsersController(ICookRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> getFollowUsers() {
            
          var followUsers = await  _repo.GetFollowUsers(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));
        
            return Ok(followUsers);
        }



    }
}