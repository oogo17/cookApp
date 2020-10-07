using System.Collections.Generic;
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
    public class NotificationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICookRepository _repo;
        public NotificationsController(ICookRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipeNotification(int id) {

          var notifications = await  _repo.GetNotifications(id);

          var notificationsMapped = _mapper.Map<IEnumerable<NotificationForDetailedDto>>(notifications);

          foreach (var notification in notificationsMapped)
          {
              notification.Username = await _repo.GetUsername(notification.UserId);
          }

          return Ok(notificationsMapped);
        }

    }
}