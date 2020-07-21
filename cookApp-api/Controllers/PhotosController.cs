using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using cookApp_api.Data;
using cookApp_api.Dtos;
using cookApp_api.Helpers;
using cookApp_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace cookApp_api.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photo")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IMapper _mapper;
        private readonly ICookRepository _repo;
        private Cloudinary _cloudinary;

        public PhotosController(ICookRepository repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            
            Account cc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret

            );

            _cloudinary = new Cloudinary(cc);
        }


        [HttpPost]
        public async Task<IActionResult> addPhotoToUser (int userId, [FromForm] PhotoForCreationDto photoForCreationDto) {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

               var user = await _repo.GetUser(userId);

               var file = photoForCreationDto.File;

               var uploadResults = new ImageUploadResult();
             
               if (file.Length > 0) {

                   using (var stream = file.OpenReadStream())
                   {
                       var uploadParams = new ImageUploadParams() {

                           File = new FileDescription(file.Name, stream),
                           Transformation = new Transformation()
                                .Width(500)
                                .Height(500)
                                .Crop("fill")
                                .Gravity("face")
                       };
                       uploadResults = _cloudinary.Upload(uploadParams);
                   }
               } 

               photoForCreationDto.PhotoUrl = uploadResults.Uri.ToString();
               photoForCreationDto.PublicId = uploadResults.PublicId;

               var usermapDto = _mapper.Map(photoForCreationDto,user);
               
            if(await _repo.SaveAll())
                return Ok(photoForCreationDto);

            throw new Exception($"the update fail for user {userId}"); 
               

        }


    }
}