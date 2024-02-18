using ServiceDelivery.Models.Admin;
using ServiceDelivery.ServiceMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.ViewModels.AdminViewModels
{
    public class OnlineUsersViewModel: ViewModelBase
    {
        private OnlineUsersModel onlineUsersModel;

        public OnlineUsersViewModel()
        {
            onlineUsersModel = new OnlineUsersModel();
            DeliveryServiceClient client = new DeliveryServiceClient();
            onlineUsersModel.OnlineUsers = client.GetOnlineUsersCount();
        }

        //
        //Изменяемые Свойства
        //
        public int Count
        {
            get => onlineUsersModel.OnlineUsers;
            set
            {
                onlineUsersModel.OnlineUsers = value;
                OnPropertyChanged("Count");
            }
        }
    }
}
