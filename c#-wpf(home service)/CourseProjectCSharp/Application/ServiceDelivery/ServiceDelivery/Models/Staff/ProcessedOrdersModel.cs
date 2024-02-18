using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.Staff
{
    public class ProcessedOrdersModel
    {
        public ObservableCollection<OrderModel> Orders { get; set; } = new ObservableCollection<OrderModel>();
    }
}
