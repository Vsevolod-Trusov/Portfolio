using ServiceDelivery.Helpers;
using ServiceDelivery.ViewModels;
using ServiceDelivery.ViewModels.AdminViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ServiceDelivery.Views.Pages.AdminView
{
    /// <summary>
    /// Interaction logic for AdminView.xaml
    /// </summary>
    public partial class AdminView : Page
    {
        private bool openCloseMenuFlag = true;
        public AdminView()
        {
            InitializeComponent();
        }

        private void CloseOpenMenu(object sender, RoutedEventArgs e)
        {
            if (!openCloseMenuFlag)
            {
                Storyboard sb = this.FindResource("OpenMenu") as Storyboard;
                sb.Begin();
            }
            else
            {
                Storyboard sb = this.FindResource("CloseMenu") as Storyboard;
                sb.Begin();
            }
            openCloseMenuFlag = !openCloseMenuFlag;
        }

        private void OpenOrdersPage(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("createdOrders") as CreatedOrderView).DataContext = new CreatedOrderViewModel();
            (MainFrameNavigator.GetPage("admin") as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("createdOrders");
        }

        private void OpenSettingPage(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("admin") as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("settings");
        }

        private void OpenAdminMainView(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("onlineUsers") as OnllineUsersView).DataContext = new OnlineUsersViewModel();
            (MainFrameNavigator.GetPage("admin") as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("onlineUsers");
        }

        private void OpenAddAdminView(object sender, RoutedEventArgs e)
        {
            foreach (Window window in Application.Current.Windows)
            {
                if (window.GetType() == typeof(AddAdminView))
                {
                    (window as AddAdminView).Hide();
                    (window as AddAdminView).Close();
                }
            }
            Window _addAdminView = new AddAdminView();
            _addAdminView.Show();
        }
        
        private void OpenProfileAdminPage(object sender, RoutedEventArgs e)
        {
            MainFrameNavigator.GetPage("adminProfile").DataContext = new AdminProfileViewModel(); ;
            (MainFrameNavigator.GetPage("admin") as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("adminProfile");
        }
    }
}
