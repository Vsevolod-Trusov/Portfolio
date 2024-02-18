using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.Models.Staff;
using ServiceDelivery.ServiceMethods;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels.StaffViewModels
{
    public class ProcessedOrdersViewModel : ViewModelBase
    {
        private ProcessedOrdersModel processedOrdersModel;
        private OrderModel selectedOrder;
        public ProcessedOrdersViewModel()
        {
            processedOrdersModel = new ProcessedOrdersModel();
            selectedOrder = new OrderModel();
            DeliveryServiceClient client = new DeliveryServiceClient();

            Dictionary<string, string>[] orders = client.GetWaitingOrders(MainFrameNavigator.Id);
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    processedOrdersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Price = order["price"],
                        DeadlineString = order["deadline"],
                        OrderDateString = order["orderDate"],
                        Status = order["status"],
                        Category = order["category"],
                        Email = order["email"]
                    });
                }
            }


        }

        //
        //Изменяемые Свойства
        //
        public ObservableCollection<OrderModel> Orders
        {
            get => processedOrdersModel.Orders;
            set
            {
                processedOrdersModel.Orders = value;
                OnPropertyChanged("Orders");
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

        private DelegateCommand _openConfirmPage;

        public ICommand OpenConfirmPage
        {
            get
            {
                if (_openConfirmPage == null)
                {
                    _openConfirmPage = new DelegateCommand(OpenConfirmView, CanCompleteOrder);

                }
                return _openConfirmPage;
            }
        }
        private bool CanCompleteOrder()
        {
            if (SelectedOrder != null)
                return SelectedOrder.Status == "processed";
            else
                return false;
        }
        private void OpenConfirmView()
        {
            DialogResult dialogResult = System.Windows.Forms.MessageBox.Show("Вы уверены?", "Выполнить заказ", (MessageBoxButtons)MessageBoxButton.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                if (selectedOrder != null)
                {
                    DeliveryServiceClient serviceClient = new DeliveryServiceClient();
                    serviceClient.CompleteOrder(selectedOrder.Id);
                }
                Refresh();
            }
           
        }

        private void Refresh()
        {
            Orders.Clear();
            DeliveryServiceClient client = new DeliveryServiceClient();


            Dictionary<string, string>[] orders = client.GetWaitingOrders(MainFrameNavigator.Id);
            if (orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    processedOrdersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Price = order["price"],
                        DeadlineString = order["deadline"],
                        OrderDateString = order["orderDate"],
                        Status = order["status"],
                        Category = order["category"],
                        Email = order["email"]
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

            Dictionary<string, string>[] orders = client.GetFilteredWaitingOrdersByStatus("processed", MainFrameNavigator.Id);
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    processedOrdersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Email = order["email"],
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


            Dictionary<string, string>[] orders = client.GetFilteredWaitingOrdersByStatus("completed", MainFrameNavigator.Id);
            if(orders != null)
            {
                foreach (Dictionary<string, string> order in orders)
                {
                    processedOrdersModel.Orders.Add(new OrderModel()
                    {
                        Id = Guid.Parse(order["id"]),
                        Description = order["description"],
                        Customer = order["customer"],
                        Email = order["email"],
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
