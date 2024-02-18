using ServiceDelivery.Helpers;
using ServiceDelivery.ViewModels;
using ServiceDelivery.Views.Pages.AdminView;
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
using ServiceDelivery.Views.Pages.AdminView;
using ServiceDelivery.ViewModels.UserViewModels;
using ServiceDelivery.ServiceMethods;

namespace ServiceDelivery.Views.Pages.UserView
{
    /// <summary>
    /// Interaction logic for UserView.xaml
    /// </summary>
    public partial class UserView : Page
    {
        private bool openCloseMenuFlag = true;
        public UserView()
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

        private void OpenDoOrderPage(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("doOrder");
        }

        private void OpenReviewPage(object sender, RoutedEventArgs e)
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            Dictionary<string, string>[] staffs = client.GetStaffForReview(MainFrameNavigator.Id);
           if(staffs != null)
            {
                if (staffs.Length != 0)
                {
                    (MainFrameNavigator.GetPage("review") as ReviewView).DataContext = new ReviewViewModel();

                    (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("review");
                }
            }
        }

        private void OpenOrdersPage(object sender, RoutedEventArgs e)
        {
            MainFrameNavigator.GetPage("userOrders").DataContext = new OrdersViewModel();
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("userOrders");
        }

        private void OpenProfileUserPage(object sender, RoutedEventArgs e)
        {
            MainFrameNavigator.GetPage("userProfile").DataContext = new UserProfileViewModel(); ;
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("userProfile");
        }

        private void OpenSettingPage(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("settings");
        }

        private void OpenAboutUs(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("aboutUs");
        }
    }
}
