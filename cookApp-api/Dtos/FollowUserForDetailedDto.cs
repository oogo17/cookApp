using System;

namespace cookApp_api.Dtos
{
    public class FollowUserForDetailedDto
    {
       public int Id { get; set; }
       public DateTime DateCreated { get; set; }
       public int UserId { get; set; }
       public int FollowerId { get; set; }
    }
}