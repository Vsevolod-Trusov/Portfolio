using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class EditModel
    {
        public System.Collections.ObjectModel.ObservableCollection<ProfileModel> Staff { get; set; } = new System.Collections.ObjectModel.ObservableCollection<ProfileModel>();
        public ProfileModel SelectedStaff { get; set; }
        public OrderModel SelectedOrder{ get; set; }
    }
}
