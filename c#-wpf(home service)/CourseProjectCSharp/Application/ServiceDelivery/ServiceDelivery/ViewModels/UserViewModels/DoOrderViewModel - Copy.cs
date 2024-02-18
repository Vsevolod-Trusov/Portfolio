using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels.UserViewModels
{
    public class DoOrderViewModel: ViewModelBase
    {
        private DelegateCommand _openDriverView;

        public ICommand OpenDriverView
        {
            get
            {
                if (_openDriverView == null)
                {
                    _openDriverView = new DelegateCommand(OpenDriverPage);
                }
                return _openDriverView;
            }
        }

        private void OpenDriverPage()
        {
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("carDriver");
        }

        private DelegateCommand _openDeliveryView;

        public ICommand OpenDeliveryView
        {
            get
            {
                if (_openDeliveryView == null)
                {
                    _openDeliveryView = new DelegateCommand(OpenDeliveryPage);
                }
                return _openDeliveryView;
            }
        }

        private void OpenDeliveryPage()
        {
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("delivery");
        }

        private DelegateCommand _openHomeOrderView;

        public ICommand OpenHomeOrderView
        {
            get
            {
                if (_openHomeOrderView == null)
                {
                    _openHomeOrderView = new DelegateCommand(OpenHomeView);
                }
                return _openHomeOrderView;
            }
        }

        private void OpenHomeView()
        {
            (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("homeOrder");
        }
    }
}
