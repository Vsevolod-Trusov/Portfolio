using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.User
{
    public class OrdersModel
    {
        public ObservableCollection<OrderModel> Orders { get; set; } = new ObservableCollection<OrderModel>();
    }
}
