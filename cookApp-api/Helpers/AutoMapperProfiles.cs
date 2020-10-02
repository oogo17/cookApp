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
            CreateMap<Allergy, AllergyForDetailedDto>();

            CreateMap<UserForUpdateDto, User>();
            CreateMap<PhotoForCreationDto,User>();
            CreateMap<PhotoForCreationRecipeDto,Recipe>();

            CreateMap<RecipeForUpdateDto, Recipe>();
            CreateMap<IngredientForUpdateDto, Ingredient>();
            CreateMap<StepForUpdateDto, Step>();

            CreateMap<RecipeForCreateDto, Recipe>();
            CreateMap<Recipe, RecipeForListDto>();
            CreateMap<FollowUser, FollowUserToGetListDto>();
            CreateMap<User, FallowUserForCreateDto>();
            CreateMap<FallowUserForCreateDto, FollowUser>();
            CreateMap<Recipe,FollowUserForCreateRecipeDto>();
            CreateMap<Ingredient, IngredientForUpdateDto>()
             .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<Step, StepForUpdateDto>()
             .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<FollowUserForCreateRecipeDto, Recipe>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UpdatePasswordHashSaltForUser, User>();
            CreateMap<UpdateRecipeCreateNotificationDto, Notification>();
            CreateMap<Notification, NotificationForDetailedDto>()
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.NotificationType.Description))
                .ForMember(dest => dest.Entity, opt => opt.MapFrom(src => src.NotificationType.Entity));
            
            // Reviews

            CreateMap<ReviewForCreateDto, Review>();
            CreateMap<Review, ReviewForDetailDto>();
            CreateMap<ReviewForDetailGetUserDetailDto, ReviewForDetailDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.PhotoUrl));


        }
    }
}