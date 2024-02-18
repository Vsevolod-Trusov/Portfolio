using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class ProfileModel
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Count { get; set; }
        public string Email { get; set; }
        public string UserRole { get; set; }

        public string Avatar { get; set; }
        public ObservableCollection<string> ServiceType { get; set; }

    }
}
