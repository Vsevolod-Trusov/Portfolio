using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models.User;
using ServiceDelivery.ServiceMethods;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
    public class DriverOrderViewModel : ViewModelBase
    {
        private DriverOrderModel _driverModel;

        public DriverOrderViewModel()
        {
            _driverModel = new DriverOrderModel();
            DateSubmission = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
        }

        public string SelectedClass
        {
            get
            {
                return _driverModel.CarClass;
            }
            set
            {
                _driverModel.CarClass = value;
                OnPropertyChanged("Price");
                OnPropertyChanged("SelectedClass");
            }
        }

        public string Time
        {
            get
            {
                return _driverModel.Time;
            }
            set
            {
                _driverModel.Time = value;
                OnPropertyChanged("Price");
                OnPropertyChanged("Time");
            }
        }

        public ImgText SelectedCar
        {
            get
            {
                return _driverModel.CarModel;
            }
            set
            {
                _driverModel.CarModel = value;
                OnPropertyChanged("SelectedCar");
            }
        }


        public ObservableCollection<string> Classes
        {
            get
            {
                return _driverModel.Classes;
            }
            set
            {
                _driverModel.Classes = value;
                OnPropertyChanged("Classes");
            }
        }

        public ObservableCollection<ImgText> CarsModels
        {
            get
            {
                return _driverModel.Carsmodels;
            }
        }

        public DateTime DateSubmission
        {
            get
            {
                return _driverModel.Deadline;
            }
            set
            {
                _driverModel.Deadline = value;
                OnPropertyChanged("DateSubmission");
            }
        }

        public string SubmissionAdress
        {
            get
            {
                return _driverModel.ComeAddress;
            }
            set
            {
                _driverModel.ComeAddress = value;
                OnPropertyChanged("SubmissionAdress");
            }
        }

        public decimal Price
        {
            get
            {
                if (_driverModel.CarClass == "eco") return GetPrice("eco", Time);
                if (_driverModel.CarClass == "default") return GetPrice("default", Time); ;
                if (_driverModel.CarClass == "business") return GetPrice("business", Time);
                
                return GetPrice("", Time); ;
            }
            set
            {
                _driverModel.Price = value;
                MessageBox.Show($"{_driverModel.Price}");
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

        private void Send()
        {
            string checkResult = CheckFields();
            if (checkResult == "")
            {
                DateSubmission = DateSubmission + TimeSpan.Parse(Time);
                string FullDescription = $"Comfort: {SelectedClass}\n" +
               $"Model: {_driverModel.CarModel.Text}\n" +
               $"Price: {Price}\n" +
               $"Adress: {SubmissionAdress}\n" +
               $"Date: {DateSubmission}";
                DeliveryServiceClient client = new DeliveryServiceClient();
                client.SendOrder(FullDescription, Price, _driverModel.Deadline, "Car driver", MainFrameNavigator.Id);
                (MainFrameNavigator.GetPage("user") as UserView).MainFrames.Content = MainFrameNavigator.GetPage("doOrder");
                
                DateSubmission = DateTime.Now.Subtract(new TimeSpan(24, 0, 0));
                Time = "";
                SubmissionAdress = "Street, 21";
                SelectedCar = null;
                SelectedClass = "";
            }
            else
            {
                MessageBox.Show(checkResult);
            }
          
        }

        private string CheckFields()
        {
            Regex addressRegex= new Regex(@"^[а-яА-Яa-zA-Z]+,\s[0-9]+$");
            if (SelectedClass == null || SelectedClass == "")
                return "Вы не выбрали комфорт-класс";
            if (SelectedCar.Text == "" || SelectedCar.Text == null)
                return "Вы не выбрали машину";
            if (DateSubmission.Date == DateTime.Now.Subtract(new TimeSpan(24, 0, 0)).Date)
                return "Вы не выбрали дату";
            if (Time == null || Time == "")
                return "Вы не выбрали время";
            if (SubmissionAdress == null || SubmissionAdress == "")
                return "Вы не ввели адресс";
            if (!addressRegex.IsMatch(SubmissionAdress))
                return "Не правильный формат адресса";
            return "";
        }

        private decimal GetPrice(string comfortClass, string Time)
        {
            decimal price = 0.0m;
            switch (comfortClass)
            {
                case "eco":
                    price = 5.0m;
                    break;
                case "default":
                    price = 10.0m;
                    break;
                case "business":
                    price = 15.0m;
                    break;
            }
           if(Time != "" && Time != null)
            {
                if (TimeSpan.Parse(Time) >= TimeSpan.Parse("00:00") && TimeSpan.Parse(Time) <= TimeSpan.Parse("10:00")) price = price + price * 0.2m;
                else if (TimeSpan.Parse(Time) > TimeSpan.Parse("10:00") && TimeSpan.Parse(Time) <= TimeSpan.Parse("20:00")) price = price + price * 0.5m;
                else if (TimeSpan.Parse(Time) > TimeSpan.Parse("20:00") && TimeSpan.Parse(Time) <= TimeSpan.Parse("00:00")) price = price + price * 0.3m;
                return Math.Round(price, 1);
            }

            return Math.Round(price, 1);
        }
    }

   

}