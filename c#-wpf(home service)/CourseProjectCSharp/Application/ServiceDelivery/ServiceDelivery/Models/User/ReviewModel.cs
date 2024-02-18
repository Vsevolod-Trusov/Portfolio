using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace ServiceDelivery.Models.User
{
    public class ReviewModel
    {
        public string ReviewImagePath { get; set; }
        public string ReviewMessage { get; set; }
        public string Estimation { get; set; }
        public ProfileModel Profile { get; set; }

        public ObservableCollection<ProfileModel> Profiles { get; set; } = new ObservableCollection<ProfileModel>();
        public ObservableCollection<string> Estimations{ get; set; } = new ObservableCollection<string>() { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" };
    }
}
