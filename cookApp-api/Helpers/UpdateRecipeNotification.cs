using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using cookApp_api.Data;
using cookApp_api.Dtos;
using cookApp_api.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace cookApp_api.Helpers
{
    public class UpdateRecipeNotification : IAsyncActionFilter
    {
        private readonly IMapper _mapper;
     
        public UpdateRecipeNotification(IMapper mapper)
        {  
            _mapper = mapper;

        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var notificationDto = new UpdateRecipeCreateNotificationDto();

            var userId = int.Parse(resultContext.HttpContext.User
                        .FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<ICookRepository>();
            var data = resultContext.RouteData.Values;

            var notificationDetail = new NotificationDetails(resultContext.RouteData.Values);


            var users = await repo.GetFollowedUsers(userId);

            foreach (var user in users)
            {
                notificationDto.UserId = userId;
                notificationDto.NotificationTypeId = notificationDetail.NotificationType;

                notificationDto.NotifyUserId = user.UserId;
                notificationDto.RecipeId = notificationDetail.EntityId;
                notificationDto.Seen = false;
                notificationDto.Created = DateTime.Now;


                var notificationMapped = _mapper.Map<Notification>(notificationDto);

                repo.Add(notificationMapped);

            }
             if (await repo.SaveAll())
                {
                    return;
                }
                throw new Exception($"create notification fail");


        }
    }
}