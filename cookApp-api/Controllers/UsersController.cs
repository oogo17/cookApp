using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using cookApp_api.Data;
using cookApp_api.Dtos;
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
        private readonly IMapper _mapper;
        public UsersController(ICookRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersMapDto = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersMapDto);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userMapDto = _mapper.Map<UserForDetailedDto>(user);
           
            return Ok(userMapDto);
        }




    }
}