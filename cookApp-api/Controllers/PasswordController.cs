using System;
using System.Threading.Tasks;
using AutoMapper;
using cookApp_api.Data;
using cookApp_api.Dtos;
using cookApp_api.Helpers;
using cookApp_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace cookApp_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICookRepository _repo;
        private readonly IEmailSender _emailSender;

        public PasswordController(ICookRepository repo, IMapper mapper, IEmailSender emailSender)
        {
            _emailSender = emailSender;
            _repo = repo;
            _mapper = mapper;

        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(PasswordRecoverForUserDto userInfo)
        {

            var user = await _repo.GetUserByEmail(userInfo.Email);

            if (user == null)
            {
                throw new Exception("Cant find user with that Email");
            }

            var message = new Message(new string[] { "oogomx@gmail.com" }, "Test email", "This is the content from our email.");
            _emailSender.SendEmail(message);



            return Ok();
        }
    }
}