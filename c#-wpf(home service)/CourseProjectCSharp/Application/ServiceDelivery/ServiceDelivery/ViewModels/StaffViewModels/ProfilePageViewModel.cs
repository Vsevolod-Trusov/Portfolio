using Microsoft.Win32;
using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;
using MessageBox = System.Windows.Forms.MessageBox;

namespace ServiceDelivery.ViewModels
{
    public class ProfilePageViewModel : ViewModelBase
    {
        private ProfilePageModel _profilePageModel;
        
        public ProfilePageViewModel()
        {
            _profilePageModel = new ProfilePageModel();
            DeliveryServiceClient client = new DeliveryServiceClient();
            string[] serviceTypes = client.GetServiceTypes(MainFrameNavigator.Id);
            if(serviceTypes != null)
            {
                foreach (string category in serviceTypes)
                {
                    _profilePageModel.defaultServiceTypes.Add(category);
                }
                if (_profilePageModel.defaultServiceTypes.Count == 0)
                    IsEnabled = false;
            }
        }

        public bool IsEnabled
        {
            get
            {
                return _profilePageModel.ComboBoxEnable;
            }
            set
            {
                _profilePageModel.ComboBoxEnable = value;
                OnPropertyChanged("IsEnabled");
            }
        }
        public string SelectedServiceType
        {
            get
            {
                return _profilePageModel.SelectedServiceType;
            }
            set
            {
                _profilePageModel.SelectedServiceType = value;
                OnPropertyChanged("SelectedServiceType");
            }
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
        public ObservableCollection<string> ServiceTypes
        {
            get
            {
                return _profilePageModel.defaultServiceTypes;
            }
            set
            {
                _profilePageModel.defaultServiceTypes = value;
                OnPropertyChanged("ServiceTypes");
            }
        }

        private DelegateCommand _saveProfileChanges;

        public ICommand SaveStaffChanges
        {
            get
            {
                if (_saveProfileChanges == null)
                {
                    _saveProfileChanges = new DelegateCommand(SaveChanges, CanSaveTypeChanges);
                }
                return _saveProfileChanges;
            }
        }
        private void SaveChanges()
        {
            DialogResult dialogResult = System.Windows.Forms.MessageBox.Show("Вы уверены?", "Изменение профиля", (MessageBoxButtons)MessageBoxButton.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                DeliveryServiceClient client = new DeliveryServiceClient();
                client.ChangeStaffProfile(MainFrameNavigator.Id, SelectedServiceType);
                _profilePageModel.defaultServiceTypes.Clear();

                string[] serviceTypes = client.GetServiceTypes(MainFrameNavigator.Id);
                if (serviceTypes != null)
                {
                    foreach (string category in serviceTypes)
                    {
                        _profilePageModel.defaultServiceTypes.Add(category);
                    }
                    if (_profilePageModel.defaultServiceTypes.Count == 0)
                        (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ServiceTypesComboBox.IsEnabled = true;
                }
                 
            }
            SelectedServiceType = "";
        }

        private bool CanSaveTypeChanges()
        {
            return SelectedServiceType != null && SelectedServiceType != "";
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
                (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.MinHeight = 0;
                (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.MinWidth = 0;
                (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.Height = 0;
                (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.Width = 0;
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
             (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.MinHeight = 180;
            (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.MinWidth = 360;
            (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.Height = 180;
            (MainFrameNavigator.GetPage("staffProfile") as StaffProfileView).ImageTitle.Width = 360;
            MessageBox.Show("Чтобы изменения вступили всилу, перезайдите в ваш аккаунт");
        }
        private bool CanSaveImage()
        {
            return ImagePath != null && ImagePath != "";
        }
    }
}
