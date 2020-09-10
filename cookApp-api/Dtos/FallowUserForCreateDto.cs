using System;

namespace cookApp_api.Dtos
{
    public class FallowUserForCreateDto
    {
        public DateTime DateCreated { get; set; }
        public int UserId { get; set; }
        public int FollowerId { get; set; }
    }
}