using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.Models.User;
using ServiceDelivery.ServiceMethods;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels.UserViewModels
{
    public class OrdersViewModel: ViewModelBase
    {
        private OrdersModel _ordersModel;
        public OrdersViewModel()
        {
            _ordersModel = new OrdersModel();
            DeliveryServiceClient client = new DeliveryServiceClient();
            Dictionary<string, string>[] customerOrders = client.GetCustomerOrders(MainFrameNavigator.Id);
            if(customerOrders != null)
            {
                foreach (Dictionary<string, string> order in customerOrders)
                {
                    _ordersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Executor = order["executor"],
                        Price = order["price"],
                        DeadlineString = order["deadline"],
                        OrderDateString = order["orderDate"],
                        Status = order["status"],
                        Category = order["category"]
                    });
                }
            }
        }


        public ObservableCollection<OrderModel> CustomerOrders
        {
            get => _ordersModel.Orders;
            set
            {
                _ordersModel.Orders = value;
                OnPropertyChanged("CustomerOrders");
            }
        }

        private DelegateCommand _doFilter;

        public ICommand DoFilter
        {
            get
            {
                if (_doFilter == null)
                {
                    _doFilter = new DelegateCommand(DoUnProcessedFilterMethod);

                }
                return _doFilter;
            }
        }

        private void DoUnProcessedFilterMethod()
        {
            CustomerOrders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetCustomerFilteredOrders(MainFrameNavigator.Id, "unprocessed");
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    _ordersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Executor = order["executor"],
                        Price = order["price"],
                        DeadlineString = order["deadline"],
                        OrderDateString = order["orderDate"],
                        Status = order["status"],
                        Category = order["category"]
                    });
                }
            }
            
        }

        private DelegateCommand _doProcessedFilter;

        public ICommand DoProcessedFilter
        {
            get
            {
                if (_doProcessedFilter == null)
                {
                    _doProcessedFilter = new DelegateCommand(DoProcessedFilterMethod);

                }
                return _doProcessedFilter;
            }
        }

        private void DoProcessedFilterMethod()
        {
            CustomerOrders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetCustomerFilteredOrders(MainFrameNavigator.Id,"processed");
            if (orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    _ordersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Executor = order["executor"],
                        Price = order["price"],
                        DeadlineString = order["deadline"],
                        OrderDateString = order["orderDate"],
                        Status = order["status"],
                        Category = order["category"]
                    });
                }
            }
           
        }

        private DelegateCommand _doCompletedFilter;

        public ICommand DoCompletedFilter
        {
            get
            {
                if (_doCompletedFilter == null)
                {
                    _doCompletedFilter = new DelegateCommand(DoCompletedFilterMethod);

                }
                return _doCompletedFilter;
            }
        }

        private void DoCompletedFilterMethod()
        {
            CustomerOrders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetCustomerFilteredOrders(MainFrameNavigator.Id, "completed");
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    _ordersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Executor = order["executor"],
                        Price = order["price"],
                        DeadlineString = order["deadline"],
                        OrderDateString = order["orderDate"],
                        Status = order["status"],
                        Category = order["category"]
                    });
                }
            }
           
        }

    }
}
