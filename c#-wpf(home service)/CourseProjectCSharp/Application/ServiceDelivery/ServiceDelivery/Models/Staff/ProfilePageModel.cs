using ServiceDelivery.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class ProfilePageModel
    {
        public ObservableCollection<string> defaultServiceTypes { get; set; } = new ObservableCollection<string>();
        public string SelectedServiceType { get; set; }
        public string ImagePath { get; set; }
        public string Email { get; set; }
        public string CurrentEmail { get; set; } = MainFrameNavigator.Email;
        public bool ComboBoxEnable { get; set; } = true;
    }
}
