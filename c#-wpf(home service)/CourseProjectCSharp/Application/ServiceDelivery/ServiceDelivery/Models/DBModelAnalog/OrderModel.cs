using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class OrderModel
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Customer { get; set; }
        public string Executor { get; set; }
        public string Price { get; set; }
        public string DeadlineString { get; set; }
        public string OrderDateString { get; set; }
        public string Status { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        
    }
}
