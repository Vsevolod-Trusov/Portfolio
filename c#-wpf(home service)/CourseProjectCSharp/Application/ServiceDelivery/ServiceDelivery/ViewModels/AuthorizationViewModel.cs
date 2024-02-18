using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
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
    public class AuthorizationViewModel : ViewModelBase
    {
    private AuthorizationModel _authorizationModal;
    public AuthorizationViewModel(AuthorizationModel AuthorizationModal)
    {
        _authorizationModal = AuthorizationModal;
    }

    public AuthorizationViewModel()
    {
        _authorizationModal = new AuthorizationModel();
    }

    public string Login
    {
        get
        {
            return _authorizationModal.Login;
        }
        set
        {
            _authorizationModal.Login = value;
            OnPropertyChanged("Login");
        }
    }
       
        public string Password
        {
            get
            {
                return _authorizationModal.Password;
            }
            set
            {
                _authorizationModal.Password = value;
                OnPropertyChanged("Password");
            }
        }

    public string ErrorMessage
    {
        get
        {
            return _authorizationModal.ErrorMessage;
        }
        set
        {
            _authorizationModal.ErrorMessage = value;
            OnPropertyChanged("ErrorMessage");
        }
    }

    public System.Collections.ObjectModel.ObservableCollection<string> Roles
    {
        get
        {
            return _authorizationModal.Roles;
        }
    }

    public string Role
    {
        get
        {
            return _authorizationModal.Role;
        }
        set
        {
            _authorizationModal.Role = value;
            OnPropertyChanged("Role");
        }
    }
    //
    //Обработка нажатия на кнопку Login
    //
    private DelegateCommand _transferLoginPassword;

    public ICommand TransferLoginPassword
    {
        get
        {
            if (_transferLoginPassword == null)
            {
                _transferLoginPassword = new DelegateCommand(TransferLoginPasswordExecute);
            }
            return _transferLoginPassword;
        }
    }

    public void TransferLoginPasswordExecute()
    {
           DeliveryServiceClient client = new DeliveryServiceClient();
           ErrorMessage = client.AuthorisationWithValidation($"{Login}", $"{ Password}", $"{Role}");
            if (ErrorMessage == "")
            {
                MainFrameNavigator.Login = Login;
                MainFrameNavigator.Role = Role;
                MainFrameNavigator.Password = Password;

                Guid id = client.GetId(MainFrameNavigator.Login, MainFrameNavigator.Password, MainFrameNavigator.Role);
                if (id != Guid.Empty)
                    MainFrameNavigator.Id = id; 

                client.AddUserCount(MainFrameNavigator.Id);

                string eMail = client.GetEmail(MainFrameNavigator.Id);
                if (eMail != null)
                    MainFrameNavigator.Email = eMail; 

                MainWindowView mainWindow = new MainWindowView();
                mainWindow.DataContext = new MainWindowViewModel(MainFrameNavigator.Role);
                mainWindow.Show();

                foreach (Window window in Application.Current.Windows)
                {
                    if (window.GetType() == typeof(AuthorizationView))
                    {
                        (window as AuthorizationView).Hide();
                        (window as AuthorizationView).Close();
                    }
                }
            }
    }
}
}
