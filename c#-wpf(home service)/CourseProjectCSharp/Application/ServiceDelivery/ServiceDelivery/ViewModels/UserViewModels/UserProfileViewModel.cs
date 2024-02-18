using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models.User;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;
using MessageBox = System.Windows.Forms.MessageBox;

namespace ServiceDelivery.ViewModels.UserViewModels
{
    public class UserProfileViewModel: ViewModelBase
    {
        private UserProfileModel _profilePageModel;

        public UserProfileViewModel()
        {
            _profilePageModel = new UserProfileModel();
            CurrentEmail = MainFrameNavigator.Email;
        }

        public string Email
        {
            get
            {
                return _profilePageModel.Email;
            }
            set
            {
                _profilePageModel.Email = value;
                OnPropertyChanged("Email");
            }
        }

        public string ImagePath
        {
            get
            {
                return _profilePageModel.ImagePath;
            }
            set
            {
                _profilePageModel.ImagePath = value;
                OnPropertyChanged("ImagePath");
            }
        }
        public string CurrentEmail

        {
            get
            {
                return _profilePageModel.CurrentEmail;
            }
            set
            {
                _profilePageModel.CurrentEmail = value;
                OnPropertyChanged("CurrentEmail");
            }

        }

        private DelegateCommand _saveEmailChanges;
        public ICommand SaveEmailChanges
        {
            get
            {
                if (_saveEmailChanges == null)
                {
                    _saveEmailChanges = new DelegateCommand(SaveEmail, CanSaveEmailChanges);
                }
                return _saveEmailChanges;
            }
        }

        private void SaveEmail()
        {
            Regex regex = new Regex(@"^([a-zA-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$");

            DialogResult dialogResult = System.Windows.Forms.MessageBox.Show("Вы уверены?", "Изменить почту", (MessageBoxButtons)MessageBoxButton.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                if (Email.Length <= 100)
                {
                    if (regex.IsMatch(Email))
                    {
                        DeliveryServiceClient serviceClient = new DeliveryServiceClient();
                        serviceClient.ChangeEmail(MainFrameNavigator.Id, Email);
                        CurrentEmail = Email;
                        MainFrameNavigator.Email = Email;
                    }
                    else
                    {
                        System.Windows.Forms.MessageBox.Show("Неверное значение в поле email");
                    }
                }
                else
                {
                    System.Windows.Forms.MessageBox.Show("Длина почты не более 100 символов");
                }
                Email = "";
            }
        }

        private bool CanSaveEmailChanges()
        {
            return Email != null && Email != "";
        }

        private DelegateCommand _selectImg;

        public ICommand SelectImg
        {
            get
            {
                if (_selectImg == null)
                {
                    _selectImg = new DelegateCommand(SelectImage);
                }
                return _selectImg;
            }
        }
        private void SelectImage()
        {
            Microsoft.Win32.OpenFileDialog openFileDialog = new Microsoft.Win32.OpenFileDialog();
            openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.jpe, *.jfif, *.png) | *.jpg; *.jpeg; *.jpe; *.jfif; *.png";

            if (openFileDialog.ShowDialog() == true)
            {
                (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.MinHeight = 0;
                (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.MinWidth = 0;
                (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.Height = 0;
                (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.Width = 0;
                ImagePath = openFileDialog.FileName;
                OnPropertyChanged("ImagePath");
            }
        }

        private DelegateCommand _saveSelectedImage;

        public ICommand SaveSelectedImage
        {
            get
            {
                if (_saveSelectedImage == null)
                {
                    _saveSelectedImage = new DelegateCommand(SaveImage, CanSaveImage);
                }
                return _saveSelectedImage;
            }
        }
        private void SaveImage()
        {
            DialogResult dialogResult = System.Windows.Forms.MessageBox.Show("Вы уверены?", "Изменить аватар", (MessageBoxButtons)MessageBoxButton.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                DeliveryServiceClient serviceClient = new DeliveryServiceClient();
                serviceClient.ChangeAvatar(MainFrameNavigator.Id, ImagePath);

            }
            ImagePath = "";
            (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.MinHeight = 180;
            (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.MinWidth = 360;
            (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.Height = 180;
            (MainFrameNavigator.GetPage("userProfile") as UserProfileView).ImageTitle.Width = 360;

            MessageBox.Show("Чтобы изменения вступили всилу, перезайдите в ваш аккаунт");
        }
        private bool CanSaveImage()
        {
            return ImagePath != null && ImagePath != "";
        }
    }
}
