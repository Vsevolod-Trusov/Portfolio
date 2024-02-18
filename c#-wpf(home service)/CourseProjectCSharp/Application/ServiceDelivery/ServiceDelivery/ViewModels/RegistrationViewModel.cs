using ServiceDelivery.Commands;
using ServiceDelivery.Models;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels
{
    public class RegistrationViewModel : ViewModelBase
    {
        public RegistrationModel _registrationModel;

        public RegistrationViewModel(RegistrationModel registrationModel)
        {
            _registrationModel = registrationModel;
        }

        public RegistrationViewModel()
        {
            _registrationModel = new RegistrationModel();
        }

        public string Login
        {
            get
            {
                return _registrationModel.Login;
            }
            set
            {
                _registrationModel.Login = value;
                OnPropertyChanged("Login");
            }
        }

        public string Password
        {
            get
            {
                return _registrationModel.Password;
            }
            set
            {
                _registrationModel.Password = value;
                OnPropertyChanged("Password");
            }
        }

        public string Role
        {
            get
            {
                return _registrationModel.Role;
            }
            set
            {
                _registrationModel.Role = value;
                OnPropertyChanged("Role");
            }
        }

        public string Email
        {
            get
            {
                return _registrationModel.Email;
            }
            set
            {
                _registrationModel.Email = value;
                OnPropertyChanged("Email");
            }
        }
        public string ConfirmPassword
        {
            get
            {
                return _registrationModel.ConfirmPassword;
            }
            set
            {
                _registrationModel.ConfirmPassword = value;
                OnPropertyChanged("ConfirmPassword");
            }
        }

        public string ErrorMessage
        {
            get
            {
                return _registrationModel.ErrorMessage;
            }
            set
            {
                _registrationModel.ErrorMessage = value;
                OnPropertyChanged("ErrorMessage");
            }
        }

        public System.Collections.ObjectModel.ObservableCollection<string> Roles
        {
            get
            {
                return _registrationModel.Roles;
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
            ErrorMessage = client.RegistrationWithValidation($"{Login}", $"{ Password}", $"{ConfirmPassword}", $"{Role}", $"{Email}");
            
            if(ErrorMessage == "")
            {
                AuthorizationView authorizationView = new AuthorizationView();
                authorizationView.Show();

                foreach (Window window in Application.Current.Windows)
                {
                    if (window.GetType() == typeof(RegistrationView))
                    {
                        (window as RegistrationView).Hide();
                        (window as RegistrationView).Close();
                    }
                }
            }
            
        }

       
    }
}
