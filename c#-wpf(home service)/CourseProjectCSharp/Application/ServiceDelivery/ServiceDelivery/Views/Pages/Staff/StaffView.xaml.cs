using ServiceDelivery.Helpers;
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
using ServiceDelivery.Views.Pages.UserView;
using ServiceDelivery.ViewModels.StaffViewModels;
using ServiceDelivery.ViewModels;
using ServiceDelivery.ServiceMethods;

namespace ServiceDelivery.Views.Pages.Staff
{
    /// <summary>
    /// Interaction logic for StaffView.xaml
    /// </summary>
    public partial class StaffView : Page
    {
        public StaffView()
        {
            InitializeComponent();
        }
        private bool openCloseMenuFlag = true;
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

        private void OpenProcessedOrdersPage(object sender, RoutedEventArgs e)
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            int number = client.CountExecutorServiceTypes(MainFrameNavigator.Id);
           if(number != -1)
            {
                if (number == 0)
                    OpenWarningView();
                else
                {
                    (MainFrameNavigator.GetPage("processedOrders") as ProcessedOrdersView).DataContext = new ProcessedOrdersViewModel();
                    (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("processedOrders");
                }
            }

        }

        private void OpenReviewPage(object sender, RoutedEventArgs e)
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            int count = client.CountExecutorServiceTypes(MainFrameNavigator.Id);
            if(count != -1)
            {
                if (count == 0)
                    OpenWarningView();
                else
                {
                    int number = client.CountReviews(MainFrameNavigator.Id);
                    if (number != -1)
                    {
                        if (number == 0)
                            (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("noReviews");
                        else
                        {
                            (MainFrameNavigator.GetPage("executorReview") as ExecutorReviewView).DataContext = new ExecutorReviewViewModel();
                            (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("executorReview");
                        }
                    }
                }
            }
           
        }

        private void OpenProfileStaffPage(object sender, RoutedEventArgs e)
        {
            MainFrameNavigator.GetPage("staffProfile").DataContext = new ProfilePageViewModel();
            (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("staffProfile");
        }

        private void OpenSettingPage(object sender, RoutedEventArgs e)
        {
            (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("settings");
        }

        private void OpenWarningOrAboutUsPage(object sender, RoutedEventArgs e)
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            if (client.CountExecutorServiceTypes(MainFrameNavigator.Id) == 0)
                OpenWarningView();
            else
            {
                (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("aboutUs");
            }
            
        }

        private void OpenWarningView()
        {
            (MainFrameNavigator.GetPage("staff") as StaffView).MainFrames.Content = MainFrameNavigator.GetPage("warning");
        }
    }
}
