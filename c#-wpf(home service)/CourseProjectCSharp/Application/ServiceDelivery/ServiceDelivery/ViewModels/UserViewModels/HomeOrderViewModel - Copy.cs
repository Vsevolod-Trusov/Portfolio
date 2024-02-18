using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models.User;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels.UserViewModels
{
    public class HomeOrderViewModel: ViewModelBase
    {
        private HomeOrderModel _homeOrderModel;

        public HomeOrderViewModel()
        {
            _homeOrderModel = new HomeOrderModel();
            Deadline = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
        }


        public string Description
        {
            get
            {
                return _homeOrderModel.Description;
            }
            set
            {
                _homeOrderModel.Description = value;
                OnPropertyChanged("Description");
            }
        }

        public DateTime Deadline
        {
            get
            {
                return _homeOrderModel.Deadline;
            }
            set
            {
                    _homeOrderModel.Deadline = value;
                    OnPropertyChanged("Price");
                    OnPropertyChanged("Deadline");
            }
        }

        public string Time
        {
            get
            {
                return _homeOrderModel.Time;
            }
            set
            {
                    _homeOrderModel.Time = value;
                    OnPropertyChanged("Price");
                    OnPropertyChanged("Time");
            }
        }
        public string SubmissionAdress
        {
            get
            {
                return _homeOrderModel.ComeAddress;
            }
            set
            {
                _homeOrderModel.ComeAddress = value;
                OnPropertyChanged("SubmissionAdress");
            }
        }

        public decimal Price
        {
            get
            {
                return GetPrice(Deadline, Time);
            }
            set
            {
                _homeOrderModel.Price = value;
                OnPropertyChanged("Price");
            }
        }

        private DelegateCommand _sendOrder;
        public ICommand SendOrder
        {
            get
            {
                if (_sendOrder == null)
                {
                    _sendOrder = new DelegateCommand(Send);
                }
                return _sendOrder;
            }
        }

        private decimal GetPrice(DateTime deadline, string time)
        {
            decimal price = 15.0m;

            if ((Deadline - DateTime.Now).Days >= 5) price += price * 0.1m;
            else if ((Deadline - DateTime.Now).Days < 5 && (Deadline - DateTime.Now).Days > 1) price += price * 0.3m;
            else if ((Deadline - DateTime.Now).Days <= 1) price += price * 2.0m;

            if (Time != "" && Time != null)
            {
                if (TimeSpan.Parse(Time) >= TimeSpan.Parse("00:00") && TimeSpan.Parse(Time) <= TimeSpan.Parse("10:00")) price += +price * 0.2m;
                else if (TimeSpan.Parse(Time) > TimeSpan.Parse("10:00") && TimeSpan.Parse(Time) <= TimeSpan.Parse("20:00")) price += price * 0.5m;
                else if (TimeSpan.Parse(Time) > TimeSpan.Parse("20:00") && TimeSpan.Parse(Time) <= TimeSpan.Parse("00:00")) price += price * 0.3m;
                return Math.Round(price, 1);
            }

            return Math.Round(price, 1);
        }
        private string CheckFields()
        {
            Regex addressRegex = new Regex(@"^[а-яА-Яa-zA-Z]+,\s[0-9]+$");

            if (SubmissionAdress == null || SubmissionAdress == "")
                return "Вы не ввели адресс";
            if (!addressRegex.IsMatch(SubmissionAdress))
                return "Не правильный формат адресса";
            if (Description == null || Description == "")
                return "Вы не описали задание";
            if (Deadline.Date == DateTime.Now.Subtract(new TimeSpan(24, 0, 0)).Date)
                return "Вы не выбрали дату";
            if (Time == null || Time == "")
                return "Вы не выбрали время";
            return "";
        }
        private void Send()
        {
            string checkResult = CheckFields();
            if (checkResult == "")
            {
                string FullDescription = $"Deadline: {Deadline.ToShortDateString()}\n" +
                $"Price: {Price}\n" +
                $"{Description}\n";

                DeliveryServiceClient client = new DeliveryServiceClient();
                client.SendOrder(FullDescription, Price, Deadline, "Housework", MainFrameNavigator.Id);
                (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("doOrder");
                
                Deadline = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
                Time = "";
                Description = "Clean up flat";
                SubmissionAdress = "Street, 21";
            }
            else
            {
                MessageBox.Show(checkResult);
            }
        }
    }
}
