using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class AuthorizationModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ErrorMessage { get; set; }

        public System.Collections.ObjectModel.ObservableCollection<string> Roles { get; set; }

        public AuthorizationModel(string Login, string Password, string Role)
        {
            this.Login = Login;
            this.Password = Password;
            this.Role = Role;
            ErrorMessage = string.Empty;
            Roles = new System.Collections.ObjectModel.ObservableCollection<string>(
              new string[] { "admin", "user", "staff" });
        }

        public AuthorizationModel()
        {
            this.Login = string.Empty;
            this.Password = string.Empty;
            this.Role = string.Empty;
            ErrorMessage = string.Empty;
            Roles = new System.Collections.ObjectModel.ObservableCollection<string>(
                new string[] { "admin", "user", "staff" });
        }
    }
}
