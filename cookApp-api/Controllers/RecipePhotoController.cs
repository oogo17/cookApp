using System;
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
    [Route("api/[controller]/{recipeId}/photo")]
    [ApiController]
    public class RecipePhotoController : ControllerBase
    {
        private readonly ICookRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public RecipePhotoController(ICookRepository repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig)
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

        [HttpPost]
        public async Task<IActionResult> addPhotoToRecipe (int recipeId, [FromForm] PhotoForCreationRecipeDto photoForCreationRecipeDto) {

            //Need to valida is a correct user
            // if (recipeId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
              var userValidation = User.FindFirst(ClaimTypes.NameIdentifier).Value;

               var recipe = await _repo.GetRecipe(recipeId);

               var file = photoForCreationRecipeDto.File;

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

               photoForCreationRecipeDto.PhotoUrl = uploadResults.Uri.ToString();
               photoForCreationRecipeDto.PublicId = uploadResults.PublicId;

               var usermapDto = _mapper.Map(photoForCreationRecipeDto,recipe);
               
            if(await _repo.SaveAll())
                return Ok(photoForCreationRecipeDto);

            throw new Exception($"the update fail for recipe {recipeId}"); 
               

        }

}
}