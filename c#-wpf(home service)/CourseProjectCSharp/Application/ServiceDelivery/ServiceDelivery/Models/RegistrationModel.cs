using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class RegistrationModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string ErrorMessage { get; set; }

        public System.Collections.ObjectModel.ObservableCollection<string> Roles { get; set; }

        public RegistrationModel(string Login, string Password, string ConfirmPassword, string Role)
        {
            this.Login = Login;
            this.Password = Password;
            this.ConfirmPassword = ConfirmPassword;
            this.Role = Role;
            ErrorMessage = string.Empty;
            Roles = new System.Collections.ObjectModel.ObservableCollection<string>(
              new string[] { "user", "staff" });
        }

        public RegistrationModel()
        {
            this.Login = string.Empty;
            this.Password = string.Empty;
            this.ConfirmPassword = String.Empty;
            this.Role = string.Empty;
            ErrorMessage = string.Empty;
            Roles = new System.Collections.ObjectModel.ObservableCollection<string>(
                new string[] { "user", "staff" });
        }
    }
}
