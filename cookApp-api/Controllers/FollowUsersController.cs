using System;
using System.Collections.Generic;
using System.Linq;
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
          var follow = new List<FollowUserToGetListDto>();

          var mappedFollowUser = _mapper.Map(followUsers, follow);
          foreach (var user in mappedFollowUser )
          {
              var getUserDetails = await _repo.GetFollowUsersDetails(user.FollowerId);
            user.Username = getUserDetails.UserName;
            user.UrlPhoto = getUserDetails.PhotoUrl;
            user.PublicId = getUserDetails.PublicId;
              
              
          }
          

        
            return Ok(mappedFollowUser);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> createFallowUser(int id) {

          var userId =  int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
             if ( await _repo.GetUser(userId) == null)
                return Unauthorized();

            var fallowUser = new FallowUserForCreateDto();
         
            fallowUser.DateCreated = DateTime.Now;
            fallowUser.UserId = userId;
            fallowUser.FollowerId = id;

            FollowUser newFallowUser = _mapper.Map<FollowUser>(fallowUser);
            _repo.Add(newFallowUser);


         if (await _repo.SaveAll())
        {
            return StatusCode(201);
        }

        throw new Exception($"the creation for fallowUser fail");
        
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteFallowUser(int id) {

             var userId =  int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

             if ( await _repo.GetUser(userId) == null)
                return Unauthorized();


            var currentFallow = await _repo.GetFollowUsers(userId);
            var fallowUser = currentFallow.FirstOrDefault(x => x.FollowerId == id);

            _repo.Delete(fallowUser);

            if (await _repo.SaveAll())
            return Ok();

            return BadRequest("Failed to delete FallowUser");


        }



    }
}