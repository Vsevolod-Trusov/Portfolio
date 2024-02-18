using ServiceDelivery.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.User
{
    public class UserProfileModel
    {
        public string ImagePath { get; set; }
        public string Email { get; set; }
        public string CurrentEmail { get; set; } = MainFrameNavigator.Email;
    }
}
