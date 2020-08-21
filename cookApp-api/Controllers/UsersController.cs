using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using cookApp_api.Data;
using cookApp_api.Dtos;
using cookApp_api.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace cookApp_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ICookRepository _repo;
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        public UsersController(ICookRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

             Account cc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret

            );

            _cloudinary = new Cloudinary(cc);

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersMapDto = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersMapDto);
        }
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(id);

            var userMapDto = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userMapDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (!string.IsNullOrEmpty(userForUpdateDto.UserName))
                userForUpdateDto.UserName.ToLower();

            var user = await _repo.GetUser(id);

          

            var userMapDto = _mapper.Map(userForUpdateDto, user);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"the update fail for user {id}");
        }

    }
}