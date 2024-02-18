using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.Admin
{
    public class AddAdminModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string ErrorMessage { get; set; }

        public AddAdminModel(string Login, string Password, string ConfirmPassword)
        {
            this.Login = Login;
            this.Password = Password;
            this.ConfirmPassword = ConfirmPassword;
            ErrorMessage = string.Empty;
        }

        public AddAdminModel()
        {
            this.Login = string.Empty;
            this.Password = string.Empty;
            this.ConfirmPassword = String.Empty;
            ErrorMessage = string.Empty;
        }
    }
}
