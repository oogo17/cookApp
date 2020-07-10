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

    }
}