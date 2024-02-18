using ServiceDelivery.ViewModels;
using ServiceDelivery.Views;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace ServiceDelivery
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void OnStartUp(object sender, StartupEventArgs e)
        {
         AuthorizationView view = new AuthorizationView();
        //MainWindowView mainWindowView = new MainWindowView();
        //MainWindowViewModel mainWindow = new MainWindowViewModel();
        //mainWindowView.DataContext = mainWindow;
        //mainWindowView.Show();
           view.Show(); //запуск окна авторизации
        }
    }
}
