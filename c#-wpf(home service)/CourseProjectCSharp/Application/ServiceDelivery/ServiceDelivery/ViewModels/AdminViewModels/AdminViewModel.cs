using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels
{
    public class AdminViewModel: ViewModelBase
    {
        private HelloClientAdminModel _adminModel;

        public AdminViewModel()
        {
            _adminModel = new HelloClientAdminModel();
        }

        
        //
        //Изменяемые Свойства
        //

        public Page Page
        {
            get => _adminModel.Page;
            set
            {
                _adminModel.Page = value;
                OnPropertyChanged();
            }
        }
        //
        //Обработка нажатия на кнопку Order
        //

        private DelegateCommand _openOrderPage;

        public ICommand OpenOrderPage
        {
            get
            {
                if (_openOrderPage == null)
                {
                    _openOrderPage = new DelegateCommand(OpenOrderView);
                }
                return _openOrderPage;
            }
        }
        private void OpenOrderView()
        {
            Page = MainFrameNavigator.GetPage("createdOrders");
        }



        private DelegateCommand _openSettingsPage;

        public ICommand OpenSettingsPage
        {
            get
            {
                if (_openSettingsPage == null)
                {
                    _openSettingsPage = new DelegateCommand(OpenPageView);
                }
                return _openSettingsPage;
            }
        }
        private void OpenPageView()
        {
           Page = MainFrameNavigator.GetPage("settings");
        }

        
    }
}
