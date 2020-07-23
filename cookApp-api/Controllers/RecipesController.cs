using System;
using System.Collections.Generic;
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
    public class RecipesController : ControllerBase
    {
        private readonly ICookRepository _repo;
        private readonly IMapper _mapper;
        public RecipesController(ICookRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipe(int id)
        {
            var recipe = await _repo.GetRecipe(id);
            var recipeMapDto = _mapper.Map<RecipeForDetailedDto>(recipe);

            return Ok(recipeMapDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, RecipeForUpdateDto recipeForUpdateDto)
        {
            var recipe = await _repo.GetRecipe(id);
            
            var updateRecipe = _mapper.Map(recipeForUpdateDto, recipe);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"the update fail for recipe {id}");

        }

        [HttpPost]
        public async Task<IActionResult> CreateRecipe( RecipeForCreateDto recipeForCreateDto)
        {
        //Get values from token
        //   var identity = HttpContext.User.Identity as ClaimsIdentity;
        //  if (identity != null)
        //     {    
        //          IEnumerable<Claim> claims = identity.Claims; 
        //     }
        if(User.FindFirst(ClaimTypes.NameIdentifier) == null)
            throw new Exception("Cant find user in token");


          recipeForCreateDto.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);


          var recipe =  _mapper.Map<Recipe>(recipeForCreateDto);
          _repo.Add(recipe);

          if(await _repo.SaveAll()) {
              return StatusCode(201);
          }

           throw new Exception($"the creation for recipe fail");

          
        }

    }
}