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
    //Положительное тестирование пройдено!!!!
    //Отрицательное тестирование пройдено!!!!
    public class DeliveryViewModel: ViewModelBase
    {
        private DeliveryModel _deliveryModel;

        public DeliveryViewModel()
        {
            _deliveryModel = new DeliveryModel();
            Deadline = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
        }

        public string Time
        {
            get
            {
                return _deliveryModel.Time;
            }
            set
            {
                    _deliveryModel.Time = value;
                    OnPropertyChanged("Price");
                    OnPropertyChanged("Time");
            }
        }


        public string Object
        {
            get
            {
                return _deliveryModel.Object;
            }
            set
            {
                _deliveryModel.Object = value;
                OnPropertyChanged("Object");
            }
        }

        public string AdressFrom
        {
            get
            {
                return _deliveryModel.AdressFrom;
            }
            set
            {
                _deliveryModel.AdressFrom = value;
                OnPropertyChanged("AdressFrom");
            }
        }


        public string AdressTo
        {
            get
            {
                return _deliveryModel.AdressTo;
            }
            set
            {
                _deliveryModel.AdressTo = value;
                OnPropertyChanged("AdressTo");
            }
        }


        public DateTime Deadline
        {
            get
            {
                return _deliveryModel.Deadline;
            }
            set
            {
                    _deliveryModel.Deadline = value;
                    OnPropertyChanged("Price");
                    OnPropertyChanged("Deadline");
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
                _deliveryModel.Price = value;
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
            decimal price = 10.0m;

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
           
            if (AdressFrom == null || AdressFrom == "")
                return "Вы не ввели адресс отправления";
            if (AdressFrom.Length > 50)
                return "Длина адреса(отправления) не более 50 символов";
            if (AdressTo == null || AdressTo == "")
                return "Вы не ввели адресс прибытия";
            if (AdressTo.Length > 50)
                return "Длина адреса(доставки) не более 50 символов";
            if (!addressRegex.IsMatch(AdressFrom))
                return "Не правильный формат адресса отправления";
            if (!addressRegex.IsMatch(AdressTo))
                return "Не правильный формат адресса прибытия";
            if (Object == null || Object == "")
                return "Вы не написали объект перевозки";
            if (Object.Length > 200)
                return "Длина описания не более 200 символов";
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
                Deadline += TimeSpan.Parse(Time);
                string FullDescription = $"Adress(from): {AdressFrom}\n" +
                    $"Adress(To): {AdressTo}\n" +
                    $"Object delivery: {Object}\n" +
                    $"Deadline: {Deadline}\n" +
                    $"Price: {Price}\n";

                DeliveryServiceClient client = new DeliveryServiceClient();
                client.SendOrder(FullDescription, Price, Deadline, "Delivery", MainFrameNavigator.Id); 
                (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("doOrder");
                
            }
            else
            {
                MessageBox.Show(checkResult);
            }
            Deadline = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
            Object = "IPhone 13Pro Max, IPhone shop";
            AdressFrom = "Street, 21";
            AdressTo = "Street, 21";
            Time = "";
        }
    }
}

