using Microsoft.Win32;
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
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ServiceDelivery.Views.Pages.UserView
{
    /// <summary>
    /// Interaction logic for ReviewView.xaml
    /// </summary>
    public partial class ReviewView : Page
    {
        public ReviewView()
        {
            InitializeComponent();
        }


        private void ChooseImage(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.jpe, *.jfif, *.png) | *.jpg; *.jpeg; *.jpe; *.jfif; *.png";

            if (openFileDialog.ShowDialog() == true)
            {
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.MinHeight = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.MinWidth = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.Height = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).ImageTitle.Width = 0;
                (MainFrameNavigator.GetPage("review") as ReviewView).DownloadImage.Source = new BitmapImage(new Uri(openFileDialog.FileName, UriKind.Absolute));
            }
        }
    }
}
