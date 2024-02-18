using ServiceDelivery.Models.DBModelAnalog;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.Staff
{
    public class ExecutorReviewModel
    {
        public ObservableCollection<ReviewModel> Reviews { get; set; } = new ObservableCollection<ReviewModel>();
        public ReviewModel SelectedReview{ get; set; }
    }
}
