using ServiceDelivery.Helpers;
using ServiceDelivery.ServiceMethods;
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
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ServiceDelivery.Views
{
    /// <summary>
    /// Interaction logic for MainWindowView.xaml
    /// </summary>
    public partial class MainWindowView : Window
    {
        private bool maximizedFlag = false;
        public MainWindowView()
        {
            InitializeComponent();
        }

        private void Shape_ChangeLocation(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left) DragMove();
        }

        private void Close_HelloClientWindow(object sender, MouseButtonEventArgs e)
        {
            DeliveryServiceClient client = new DeliveryServiceClient();
            client.RemoveUserCount(MainFrameNavigator.Id);
            Environment.Exit(0);
        }

        private void Maximize_HelloClientWindow(object sender, MouseButtonEventArgs e)
        {
            if (maximizedFlag == false)
            {
                WinImg.Source = new BitmapImage(new Uri("/Images/ToolBar/maxWh.png", UriKind.Relative));
                this.WindowState = WindowState.Maximized;
                maximizedFlag = true;
            }
            else
            {
                WinImg.Source = new BitmapImage(new Uri("/Images/ToolBar/restoreWh.png", UriKind.Relative));
                this.WindowState = WindowState.Normal;
                maximizedFlag = false;
            }
        }

        private void Hide_HelloClientWindow(object sender, MouseButtonEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

        private void ChangeImage_HelloClientWindow(object sender, MouseEventArgs e)
        {
            if (maximizedFlag)
            {
                WinImg.Source = new BitmapImage(new Uri("/Images/ToolBar/maxGr.png", UriKind.Relative));
            }
            else
            {
                WinImg.Source = new BitmapImage(new Uri("/Images/ToolBar/restoreGr.png", UriKind.Relative));
            }
        }

        private void ChangeImageBack_HelloClientWindow(object sender, MouseEventArgs e)
        {
            if (maximizedFlag)
            {
                WinImg.Source = new BitmapImage(new Uri("/Images/ToolBar/maxWh.png", UriKind.Relative));
            }
            else
            {
                WinImg.Source = new BitmapImage(new Uri("/Images/ToolBar/restoreWh.png", UriKind.Relative));
            }
        }
    }
}
