using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.ViewModels.AdminViewModels;
using ServiceDelivery.Views;
using ServiceDelivery.Views.Pages.AdminView;
using ServiceDelivery.Views.Pages.Staff;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels
{
    public class MainWindowViewModel: ViewModelBase
    {
        private MainWindowModel mainWindow;
        public MainWindowViewModel(string role)
        {
            mainWindow = new MainWindowModel();
            DeliveryServiceClient client = new DeliveryServiceClient();
            mainWindow.Role = MainFrameNavigator.Role;
            mainWindow.Login = MainFrameNavigator.Login;
            mainWindow.Password = MainFrameNavigator.Password;
            mainWindow.ImagePath = client.GetUserAvatarPath(MainFrameNavigator.Login, 
            MainFrameNavigator.Password, MainFrameNavigator.Role);
            
            switch (role)
            {
                case "admin":
                    MainFrameNavigator.GetPage("onlineUsers").DataContext = new OnlineUsersViewModel();
                    (MainFrameNavigator.GetPage(role) as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("onlineUsers");
                    mainWindow.RolePage = MainFrameNavigator.GetPage(role);
                    break;
                case "user":
                    (MainFrameNavigator.GetPage(role) as UserView).MainFrames.Content = MainFrameNavigator.GetPage("aboutUs");
                    mainWindow.RolePage = MainFrameNavigator.GetPage(role);
                    break;
                case "staff":
                    int number = client.CountExecutorServiceTypes(MainFrameNavigator.Id);
                    if(number != -1)
                    {
                        if (number == 0)
                            (MainFrameNavigator.GetPage(role) as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("warning");
                        else
                            (MainFrameNavigator.GetPage(role) as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("aboutUs");
                        mainWindow.RolePage = MainFrameNavigator.GetPage(role);
                    }
                    break;
            }
        }

        public MainWindowViewModel()//под самый конец добавить вкомментарии
        {
            //для тестов
            mainWindow = new MainWindowModel();
            //нужно для тестов получить так профиль ID
            DeliveryServiceClient client = new DeliveryServiceClient();
            Guid id= client.GetId("Tom", "qwerty", "user");
            if (id != Guid.Empty)
                MainFrameNavigator.Id = id;
            mainWindow.Role = "user";
            mainWindow.Login = "Tom";
            mainWindow.Password = "qwerty";

            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("aboutUs");
            mainWindow.RolePage = MainFrameNavigator.GetPage("user");
            mainWindow.ImagePath = "D:\\WallPapers\\jake.jpg";
            
        }


        public string Login
        {
            get
            {
                return mainWindow.Login;
            }
        }

        public string Role
        {
            get
            {
                return mainWindow.Role;
            }
        }

        public string ImagePath
        {
            get
            {
                return mainWindow.ImagePath;
            }
        }

        public Page RolePage
        {
            get => mainWindow.RolePage;
            set
            {
                mainWindow.RolePage = value;
                OnPropertyChanged();
            }
        }
        
        private DelegateCommand _openAthorizationView;

        public ICommand OpenAthorizationView
        {
            get
            {
                if (_openAthorizationView == null)
                {
                    _openAthorizationView = new DelegateCommand(OpenAuthorization);
                }
                return _openAthorizationView;
            }
        }

        private void OpenAuthorization() 
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            client.RemoveUserCount(MainFrameNavigator.Id);
            AuthorizationView view = new AuthorizationView();

            foreach (Window window in Application.Current.Windows)
            {
                if (window.GetType() == typeof(MainWindowView))
                {
                    (window as MainWindowView).Hide();
                    (window as MainWindowView).Close();
                }
            }

            view.Show();
        }
        
        

    }
}
