using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.DBModelAnalog
{
    public class ReviewModel
    {
        public Guid Id { get; set; } = Guid.Empty;
        public string ContentMessage { get; set; }
        public int Estimation { get; set; }

        public string ImagePath { get; set; } = "";
    }
}
