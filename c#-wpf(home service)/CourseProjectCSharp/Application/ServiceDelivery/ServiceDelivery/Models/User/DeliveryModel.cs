using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.User
{
    public class DeliveryModel
    {
        public DateTime Deadline { get; set; } 
        public string Time { get; set; } 
        public string AdressFrom { get; set; } = "Street, 21";
        public string AdressTo { get; set; } = "Street, 21";
        public string Object { get; set; } = "IPhone 13Pro Max, IPhone shop";

        public decimal Price { get; set; } = 0.0m;
    }
}
