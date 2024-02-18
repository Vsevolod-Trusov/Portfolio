using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace ServiceDelivery.Models
{
    public class MainWindowModel
    {
        public string Role { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string ImagePath { get; set; }
        public Page RolePage { get; set; }
    }
}
