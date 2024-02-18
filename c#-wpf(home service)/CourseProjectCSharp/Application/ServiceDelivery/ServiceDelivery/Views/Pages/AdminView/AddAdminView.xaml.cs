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

namespace ServiceDelivery.Views.Pages.AdminView
{
    /// <summary>
    /// Interaction logic for AddAdminView.xaml
    /// </summary>
    public partial class AddAdminView : Window
    {
        public AddAdminView()
        {
            InitializeComponent();
            WindowState = WindowState.Normal;
        }

        private void Shape_ChangeLocation(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left) DragMove();
        }

        private void Close_AuthorizeWindow(object sender, MouseButtonEventArgs e)
        {
            this.Hide();
           this.Close();
        }

        private void Hide_AuthorisationWindow(object sender, MouseButtonEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

    }
}
