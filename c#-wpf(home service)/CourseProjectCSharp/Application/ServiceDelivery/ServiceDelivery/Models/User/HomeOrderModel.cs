using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.User
{
    public class HomeOrderModel
    {
        public DateTime Deadline { get; set; } 

        public decimal Price { get; set; } = 0.0m;
        public string Description { get; set; } = "Clean up flat";
        public string ComeAddress { get; set; } = "Street, 21";
        public string Time { get; set; }
    }
}
