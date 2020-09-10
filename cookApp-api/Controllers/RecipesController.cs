using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly ICookRepository _repo;
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        public RecipesController(ICookRepository repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig )
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
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRecipe(int id)
    {
        var recipe = await _repo.GetRecipe(id);
        var recipeMapDto = _mapper.Map<RecipeForDetailedDto>(recipe);

        return Ok(recipeMapDto);
    }

    [HttpGet("{id}/all")]
    public async Task<IActionResult> GetRecipes(int id, [FromQuery]RecipeParams recipeParams) 
    {
        var recipes = await _repo.GetRecipes(id, recipeParams);

        


        var recipesMapDto = _mapper.Map<IEnumerable<RecipeForListDto>>(recipes);

        Response.AddPagination(recipes.CurrentPage,recipes.PageSize,
                recipes.TotalCount, recipes.TotalPages);

        return Ok(recipesMapDto);
    }
    
    [HttpPut("{id}")]
    [ServiceFilter(typeof(UpdateRecipeNotification))]
    public async Task<IActionResult> UpdateRecipe(int id, RecipeForUpdateDto recipeForUpdateDto)
    {
        var recipe = await _repo.GetRecipe(id);

        var updateRecipe = _mapper.Map(recipeForUpdateDto, recipe);

        if (await _repo.SaveAll())
            return NoContent();

        throw new Exception($"the update fail for recipe {id}");

    }

    [HttpPost]
    public async Task<IActionResult> CreateRecipe(RecipeForCreateDto recipeForCreateDto)
    {
        //Get values from token
        //   var identity = HttpContext.User.Identity as ClaimsIdentity;
        //  if (identity != null)
        //     {    
        //          IEnumerable<Claim> claims = identity.Claims; 
        //     }
        if (User.FindFirst(ClaimTypes.NameIdentifier) == null)
            throw new Exception("Cant find user in token");


        recipeForCreateDto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);


        var recipe = _mapper.Map<Recipe>(recipeForCreateDto);
        _repo.Add(recipe);

        if (await _repo.SaveAll())
        {
            return StatusCode(201);
        }

        throw new Exception($"the creation for recipe fail");


    }
    [HttpPost("{id}/fromfallowuser")]
    public async Task<IActionResult> createRecipeFromFallowUser(int id) {

           
     var recipe = await _repo.GetRecipe(id);

     var uploadResults = new ImageUploadResult();

            var uploadParams = new ImageUploadParams()
            {

                File = new FileDescription(recipe.PhotoUrl),
                Transformation = new Transformation()
                     .Width(500)
                     .Height(500)
                     .Crop("fill")
                     .Gravity("face")
            };
            uploadResults = _cloudinary.Upload(uploadParams);


            FollowUserForCreateRecipeDto followUser = new FollowUserForCreateRecipeDto();
            var mappedForCreateRecipeDto = _mapper.Map(recipe, followUser);
           

            mappedForCreateRecipeDto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            mappedForCreateRecipeDto.PublicId = uploadResults.PublicId;
            mappedForCreateRecipeDto.PhotoUrl = uploadResults.Uri.ToString();

             var mappedToRecipe = _mapper.Map<Recipe>(mappedForCreateRecipeDto);
            _repo.Add(mappedToRecipe);

            if (await _repo.SaveAll())
            {
                return StatusCode(201);
            }

            throw new Exception($"the creation for recipe fail");

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> deleteRecipe(int id)
    {

        var user = await _repo.GetUser(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

        if (!user.Recipes.Any(x => x.Id == id))
            return Unauthorized();

        var recipe = await _repo.GetRecipe(id);

        if (recipe.PublicId != null)
        {

            var deleteParams = new DeletionParams(recipe.PublicId);
            var result = _cloudinary.Destroy(deleteParams);

            if (result.Result == "ok")
            {
                recipe.PublicId = null;
                recipe.PhotoUrl = null;
            }
            else
            {
                return BadRequest("Failed to delete Photo");
            }

        }


        _repo.Delete(recipe);

        if (await _repo.SaveAll())
            return Ok();

        return BadRequest("Failed to delete Recipe");
    }


}
}