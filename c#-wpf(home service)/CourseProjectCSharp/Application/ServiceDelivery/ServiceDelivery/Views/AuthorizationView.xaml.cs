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
    /// Interaction logic for AuthorizationView.xaml
    /// </summary>
    public partial class AuthorizationView : Window
    {
        public AuthorizationView()
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
           
            Environment.Exit(0);
        }

        private void Hide_AuthorisationWindow(object sender, MouseButtonEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

        private void Open_RegistrationWindow(object sender, MouseButtonEventArgs e)
        {
            this.Hide();
            Window _registrationView = new RegistrationView();
            _registrationView.Show();
        }

        private void Hide_AuthorisationWindow(object sender, RoutedEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }
    }
}
