using System.Linq;
using AutoMapper;
using cookApp_api.Dtos;
using cookApp_api.Models;

namespace cookApp_api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p =>p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p =>p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<Recipe, RecipeForDetailedDto>();
            CreateMap<Ingredient, IngredientForDetailedDto>();
            CreateMap<Step, StepForDetailedDto>();
            CreateMap<FollowUser, FollowUserForDetailedDto>();
        }
    }
}