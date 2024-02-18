using Microsoft.Win32;
using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.Models.User;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace ServiceDelivery.ViewModels.UserViewModels
{
    public class ReviewViewModel: ViewModelBase
    {

        private ReviewModel _reviewModel;

        public ReviewViewModel()
        {
            _reviewModel = new ReviewModel();

            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] staffs = client.GetStaffForReview(MainFrameNavigator.Id);
           if (staffs != null)
            {
                foreach (Dictionary<string, string> profile in staffs)
                {
                    _reviewModel.Profiles.Add(new ProfileModel()
                    {
                        Id = new Guid(profile["id"]),
                        Avatar = profile["avatarPath"],
                        Login = profile["login"]
                    });
                }
            }

           
        }
        
        public ProfileModel SelectedProfile
        {
            get
            {
                return _reviewModel.Profile;
            }
            set
            {
                _reviewModel.Profile = value;
                OnPropertyChanged("SelectedProfile");
            }
        }

        public ObservableCollection<string> Estimations
        {
            get
            {
                return _reviewModel.Estimations;
            }
            set
            {
                _reviewModel.Estimations = value;
                OnPropertyChanged("Estimations");
            }
        }

        public ObservableCollection<ProfileModel> Profiles
        {
            get
            {
                return _reviewModel.Profiles;
            }
            set
            {
                _reviewModel.Profiles = value;
                OnPropertyChanged("Profiles");
            }
        }
        public string ReviewImagePath
        {
            get
            {
                return _reviewModel.ReviewImagePath;
            }
            set
            {
                _reviewModel.ReviewImagePath = value;
                OnPropertyChanged("ReviewImagePath");
            }
        }

        public string ReviewMessage
        {
            get
            {
                return _reviewModel.ReviewMessage;
            }
            set
            {
                _reviewModel.ReviewMessage = value;
                OnPropertyChanged("ReviewMessage");
            }
        }

        public string Estimation
        {
            get
            {
                return _reviewModel.Estimation;
            }
            set
            {
                _reviewModel.Estimation = value;
                OnPropertyChanged("Estimation");
            }
        }

        private DelegateCommand _sendReview;
        public ICommand SendReview
        {
            get
            {
                if (_sendReview == null)
                {
                    _sendReview = new DelegateCommand(SendNewReview);
                }
                return _sendReview;
            }
        }

        private string CheckFields()
        {
            if (SelectedProfile == null || SelectedProfile.Login == "")
                return "Вы не выбрали адресата";
            if (ReviewMessage == "" || ReviewMessage == null)
                return "Вы не написали отзыв";
            if (ReviewMessage.Length > 200)
                return "Длина отзыва не более 200 символов";
            if (Estimation == null || Estimation == "")
                return "Вы не поставили оценку";
            return "";
        }

        private void SendNewReview()
        {
            string checkResult = CheckFields();
            if (checkResult == "")
            {
                string Content = $"Estimation {Estimation}\n" +
                $"Review: {ReviewMessage}";

                DeliveryServiceClient client = new DeliveryServiceClient();
                client.CreateReview(Content, MainFrameNavigator.Id, SelectedProfile.Id, ReviewImagePath, Convert.ToInt32(Estimation));

                SelectedProfile = null;
                ReviewMessage = "";
                Estimation = null;
                (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("aboutUs");
            }
            else
            {
                MessageBox.Show(checkResult);
                SelectedProfile = null;
                ReviewMessage = "";
                Estimation = null;
            }
        }


        private DelegateCommand _chooseImage;
        public ICommand ChooseImage
        {
            get
            {
                if (_chooseImage == null)
                {
                    _chooseImage = new DelegateCommand(ChooseImg);
                }
                return _chooseImage;
            }
        }

        private void ChooseImg()
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.jpe, *.jfif, *.png) | *.jpg; *.jpeg; *.jpe; *.jfif; *.png";
              
            if (openFileDialog.ShowDialog() == true)
            {
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.MinHeight = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.MinWidth = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.Height = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.Width = 0;
                ReviewImagePath = openFileDialog.FileName;
                OnPropertyChanged("ReviewImagePath");                
            }
        }
    }
}
