using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using cookApp_api.Data;
using cookApp_api.Dtos;
using cookApp_api.Models;
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

        [HttpPost("{id}")]
        public async Task<IActionResult> createFallowUser(int id) {

          var userId =  int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

             if ( await _repo.GetUser(userId) == null)
                return Unauthorized();

            User user = await _repo.GetUser(id);
            var fallowUser = new FallowUserForCreateDto();
            FallowUserForCreateDto mapFallowUser = _mapper.Map(user,fallowUser);
            mapFallowUser.UrlPhoto = user.PhotoUrl;
            mapFallowUser.DateCreated = DateTime.Now;
            mapFallowUser.UserId = userId;

            FollowUser newFallowUser = _mapper.Map<FollowUser>(mapFallowUser);
            _repo.Add(newFallowUser);


         if (await _repo.SaveAll())
        {
            return StatusCode(201);
        }

        throw new Exception($"the creation for fallowUser fail");
        
        }



    }
}