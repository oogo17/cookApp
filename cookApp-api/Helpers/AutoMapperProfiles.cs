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
            CreateMap<Users, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p =>p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<Users, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p =>p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => 
                    opt.MapFrom(src => src.DateofBirth.CalculateAge()));
            CreateMap<Photo, PhotoForDetailedDto>();
        }
    }
}