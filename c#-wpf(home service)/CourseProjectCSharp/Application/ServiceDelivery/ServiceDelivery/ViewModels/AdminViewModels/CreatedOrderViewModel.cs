using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views;
using ServiceDelivery.Views.Pages;
using ServiceDelivery.Views.Pages.AdminView;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels
{
    public class CreatedOrderViewModel: ViewModelBase
    {
        private CreatedOrderModel createdOrderModel;
        private OrderModel selectedOrder;
        public CreatedOrderViewModel()
        {
            createdOrderModel = new CreatedOrderModel();
            selectedOrder = new OrderModel();
            DeliveryServiceClient client = new DeliveryServiceClient();

           Dictionary<string,string>[] orders = client.GetOrders();
           if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    createdOrderModel.Orders.Add(new OrderModel()
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

        //
        //Изменяемые Свойства
        //
        public ObservableCollection<OrderModel> Orders
        {
            get => createdOrderModel.Orders;
            set
            {
                createdOrderModel.Orders = value;
                OnPropertyChanged();
            }
        }

        public OrderModel SelectedOrder
        {
            get { return selectedOrder; }
            set
            {
                selectedOrder = value;
                OnPropertyChanged("SelectedOrder");
            }
        }
        //
        //Обработка нажатия на кнопку Order
        //

        private DelegateCommand _openEditPage;

        public ICommand OpenEditPage
        {
            get
            {
                if (_openEditPage == null)
                {
                    _openEditPage = new DelegateCommand(OpenEditView, CanOpenEditView);
                    
                }
                return _openEditPage;
            }
        }
     
        private bool CanOpenEditView()
        {
            if (SelectedOrder != null)
                return SelectedOrder.Status == "unprocessed";
            else
                return false;
        }

        private void OpenEditView()
        {
            MainFrameNavigator.GetPage("edit").DataContext = new EditViewModel(SelectedOrder);
            (MainFrameNavigator.GetPage("admin") as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("edit");
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
            Orders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetFilteredOrdersByStatus("unprocessed");
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    createdOrderModel.Orders.Add(new OrderModel()
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
            Orders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetFilteredOrdersByStatus("processed");
            if(orders !=null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    createdOrderModel.Orders.Add(new OrderModel()
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
            Orders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetFilteredOrdersByStatus("completed");
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    createdOrderModel.Orders.Add(new OrderModel()
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
