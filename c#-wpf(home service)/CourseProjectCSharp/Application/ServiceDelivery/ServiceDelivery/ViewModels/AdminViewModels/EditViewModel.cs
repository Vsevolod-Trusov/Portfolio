using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views.Pages.AdminView;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels
{
    public class EditViewModel: ViewModelBase
    {

        private EditModel _editModel;
      
        public EditViewModel(OrderModel selectedOrder)
        {
            _editModel = new EditModel();

            _editModel.SelectedStaff = new ProfileModel();
            _editModel.SelectedOrder = selectedOrder;
            DeliveryServiceClient client = new DeliveryServiceClient();


            Dictionary<string, string>[] staffs = client.GetNecessaryStaff(selectedOrder.Category);
           if (staffs != null)
            {
                foreach (Dictionary<string, string> staff in staffs)
                {
                    _editModel.Staff.Add(new ProfileModel()
                    {
                        Id = Guid.Parse(staff["id"]),
                        Login = staff["login"],
                        Count = staff["countOrders"],
                    }); ;
                }
            }
        }

        public EditViewModel()
        {
            _editModel = new EditModel();
            _editModel.SelectedStaff = new ProfileModel();
            _editModel.SelectedOrder = new OrderModel();
            _editModel.Staff = null;
        }

        public ProfileModel SelectedStaff
        {
            get { return _editModel.SelectedStaff; }
            set
            {
                _editModel.SelectedStaff = value;
                OnPropertyChanged("SelectedStaff");
            }
        }


        public string Executor
        {
            get { return _editModel.SelectedOrder.Executor; }
            set
            {
                _editModel.SelectedOrder.Executor = value;
                OnPropertyChanged("Executor");
            }
        }

        public string Customer
        {
            get { return _editModel.SelectedOrder.Customer; }
            set
            {
                _editModel.SelectedOrder.Customer = value;
                OnPropertyChanged("Customer");
            }
        }
        
        public System.Collections.ObjectModel.ObservableCollection<ProfileModel> Staff
        {
            get => _editModel.Staff;
            set
            {
                _editModel.Staff = value;
                OnPropertyChanged("Staff");
            }
        }

        //
        // событытия


        private DelegateCommand _changeDataOrder;

        public ICommand ChangeDataOrder
        {
            get
            {
                if (_changeDataOrder == null)
                {
                    _changeDataOrder = new DelegateCommand(ChangeOrder, CanChangeOrder);

                }
                return _changeDataOrder;
            }
        }

        private void ChangeOrder()
        {
            DialogResult dialogResult = System.Windows.Forms.MessageBox.Show("Вы уверены?", "Выполнить заказ?", (MessageBoxButtons)MessageBoxButton.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                DeliveryServiceClient client = new DeliveryServiceClient();
                client.ChangeOrder(_editModel.SelectedStaff.Id, _editModel.SelectedOrder.Id);
                (MainFrameNavigator.GetPage("createdOrders") as CreatedOrderView).DataContext = new CreatedOrderViewModel();
                (MainFrameNavigator.GetPage("admin") as AdminView).MainFrames.Content = MainFrameNavigator.GetPage("createdOrders");
               
            }
           
        }

        private bool CanChangeOrder()
        {
            return SelectedStaff.Id != Guid.Empty && SelectedStaff.Id != null;
        }
    }
}
