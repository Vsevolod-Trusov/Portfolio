using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models.DBModelAnalog;
using ServiceDelivery.Models.Staff;
using ServiceDelivery.ServiceMethods;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels.StaffViewModels
{
    public class ExecutorReviewViewModel : ViewModelBase
    {
        private ExecutorReviewModel _executoReview;

        public ExecutorReviewViewModel()
        {
            _executoReview = new ExecutorReviewModel();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] reviews = client.GetReviews(MainFrameNavigator.Id);
            if(reviews != null)
            {
                foreach (Dictionary<string, string> review in reviews)
                {
                    _executoReview.Reviews.Add(new ReviewModel()
                    {
                        Id = Guid.Parse(review["id"]),
                        ContentMessage = review["content"],
                        Estimation = Int32.Parse(review["estimation"]),
                        ImagePath = review["imagePath"]
                    });
                }
            }
        }
        public ObservableCollection<ReviewModel> Reviews
        {
            get => _executoReview.Reviews;
            set
            {
                _executoReview.Reviews = value;
                OnPropertyChanged("Reviews");
            }
        }
        public ReviewModel SelectedReview
        {
            get => _executoReview.SelectedReview;
            set
            {
                _executoReview.SelectedReview = value;
                OnPropertyChanged("SelectedReview");
            }
        }

        private DelegateCommand _deleteReview;

        public ICommand DeleteReview
        {
            get
            {
                if (_deleteReview == null)
                {
                    _deleteReview = new DelegateCommand(Delete);

                }
                return _deleteReview;
            }
        }

        private void Delete()
        {
            DialogResult dialogResult = System.Windows.Forms.MessageBox.Show( "Вы уверены?", "Удалить отзыв", (MessageBoxButtons)MessageBoxButton.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
               DeliveryServiceClient client = new DeliveryServiceClient();
               client.DeleteReview(MainFrameNavigator.Id,SelectedReview.Id);

                Reviews.Clear();

                Dictionary<string, string>[] reviews = client.GetReviews(MainFrameNavigator.Id);
                if (reviews != null)
                {
                    foreach (Dictionary<string, string> review in reviews)
                    {
                        _executoReview.Reviews.Add(new ReviewModel()
                        {
                            Id = Guid.Parse(review["id"]),
                            ContentMessage = review["content"],
                            Estimation = Int32.Parse(review["estimation"]),
                            ImagePath = review["imagePath"]
                        });
                    }
                }
            }
        }
    }
}
