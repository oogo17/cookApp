using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cookApp_api.Models
{
    public class FollowUser
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("FollowUsers")]
        public User User { get; set; }
        public int UserId { get; set; }
        
        [ForeignKey("FollowerId")]
        public User Follower { get; set; }
        public int FollowerId { get; set; }
    }
}