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
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<Recipe, RecipeForDetailedDto>();
            CreateMap<Ingredient, IngredientForDetailedDto>();
            CreateMap<Step, StepForDetailedDto>();
            CreateMap<FollowUser, FollowUserForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<PhotoForCreationDto,User>();
            CreateMap<PhotoForCreationRecipeDto,Recipe>();

            CreateMap<RecipeForUpdateDto, Recipe>();
            CreateMap<IngredientForUpdateDto, Ingredient>();
            CreateMap<StepForUpdateDto, Step>();

            CreateMap<RecipeForCreateDto, Recipe>();
            CreateMap<Recipe, RecipeForListDto>();
            CreateMap<User, FallowUserForCreateDto>();
            CreateMap<FallowUserForCreateDto, FollowUser>();

        }
    }
}