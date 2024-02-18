using ServiceDelivery.Commands;
using ServiceDelivery.Models.Admin;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views.Pages.AdminView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels.AdminViewModels
{
    public class AddAdminViewModel : ViewModelBase
    {
        public AddAdminModel _addAdminModel;

        public AddAdminViewModel(AddAdminModel addAdminModel)
        {
            _addAdminModel = addAdminModel;
        }

        public AddAdminViewModel()
        {
            _addAdminModel = new AddAdminModel();
        }

        public string Login
        {
            get
            {
                return _addAdminModel.Login;
            }
            set
            {
                _addAdminModel.Login = value;
                OnPropertyChanged("Login");
            }
        }

        public string Password
        {
            get
            {
                return _addAdminModel.Password;
            }
            set
            {
                _addAdminModel.Password = value;
                OnPropertyChanged("Password");
            }
        }


        public string Email
        {
            get
            {
                return _addAdminModel.Email;
            }
            set
            {
                _addAdminModel.Email = value;
                OnPropertyChanged("Email");
            }
        }
        public string ConfirmPassword
        {
            get
            {
                return _addAdminModel.ConfirmPassword;
            }
            set
            {
                _addAdminModel.ConfirmPassword = value;
                OnPropertyChanged("ConfirmPassword");
            }
        }

        public string ErrorMessage
        {
            get
            {
                return _addAdminModel.ErrorMessage;
            }
            set
            {
                _addAdminModel.ErrorMessage = value;
                OnPropertyChanged("ErrorMessage");
            }
        }

        private DelegateCommand transferLoginPassword;

        public ICommand TransferLoginPassword
        {
            get
            {
                if (transferLoginPassword == null)
                {
                    transferLoginPassword = new DelegateCommand(TransferLoginPasswordExecute);
                }
                return transferLoginPassword;
            }
        }

        public void TransferLoginPasswordExecute()
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            ErrorMessage = client.CreateAdminEntry($"{Login}", $"{ Password}", $"{ConfirmPassword}",$"{Email}");

            if (ErrorMessage == "")
            {
                foreach (Window window in Application.Current.Windows)
                {
                    if (window.GetType() == typeof(AddAdminView))
                    {
                        (window as AddAdminView).Hide();
                        (window as AddAdminView).Close();
                    }
                }
            }

        }

    }
}
