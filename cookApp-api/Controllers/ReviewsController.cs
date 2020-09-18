using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
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
    public class ReviewsController : ControllerBase
    {
        private readonly ICookRepository _repo;
        private readonly IAuthRepository _auth;
        private readonly IMapper _mapper;
        public ReviewsController(ICookRepository repo, IAuthRepository auth, IMapper mapper)
        {
            _mapper = mapper;
            _auth = auth;
            _repo = repo;

        }

        [HttpPost]
        public async Task<IActionResult> AddReview( ReviewForCreateDto reviewClient)
        {

            if (reviewClient.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

             if(await _repo.AlreadyUserReview(reviewClient.UserId , reviewClient.RecipeId))
                throw new Exception($"You already review this recipe");
            
            reviewClient.Created = DateTime.Now;
            reviewClient.Status = "Acepted";

            var reviewMap = _mapper.Map<Review>(reviewClient);

            _repo.Add(reviewMap);

            if ( await _repo.SaveAll()) 
                return NoContent();
            
             throw new Exception($"the creation for review fail");
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviews(int id)
        { 
          
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var reviews = await _repo.GetReviews(id);
             var reviewDetail = _mapper.Map<IEnumerable<ReviewForDetailDto>>(reviews).ToList();

            var reviewUsers = await _repo.GetUserDetailForReviews(reviews.Select(x => x.UserId).ToArray());
            var reviewUSerslist = reviewUsers.ToList();

            for (int i = 0; i < reviewDetail.Count; i++)
            {
                reviewDetail[i].Email = reviewUSerslist[i].Email;
                reviewDetail[i].PhotoUrl = reviewUSerslist[i].PhotoUrl;
                reviewDetail[i].Username = reviewUSerslist[i].Username;
            }

            return Ok(reviewDetail);
        }


    }
}