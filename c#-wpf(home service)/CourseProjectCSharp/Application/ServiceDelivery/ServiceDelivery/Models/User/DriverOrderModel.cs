using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models.User
{
    public class DriverOrderModel
    {
        public string CarClass { get; set; } = "";
        public ImgText CarModel { get; set; } = new ImgText();
        public DateTime Deadline { get; set; } 
        public string ComeAddress { get; set; } = "Street, 21";

        public string Time { get; set; } 
        public decimal Price { get; set; }

        public ObservableCollection<string> Classes { get; set; } = new ObservableCollection<string>() { "eco", "default", "business" };
        public ObservableCollection<ImgText> Carsmodels { get; set; } = new ObservableCollection<ImgText>() {
            new ImgText("Reno Logan", "/Images/Cars/logan.jpg"),
            new ImgText( "Hyundai Solaris", "/Images/Cars/solyaris.jpg"),
            new ImgText( "Toyota Camry",    "/Images/Cars/camry.jpg"),
            new ImgText( "Volkswagen Passat", "/Images/Cars/passat.jpg"),
            new ImgText( "Volkswagen Tiguan", "/Images/Cars/Tiguan.jpg"),
            new ImgText( "Audi A3 Sedan", "/Images/Cars/a3.jpg"),
            new ImgText( "Audi Q8 Sedan", "/Images/Cars/q8.jpg"),
            new ImgText( "Hyundai Elantra", "/Images/Cars/elantra.jpg"),
            new ImgText( "Hyundai Tucson", "/Images/Cars/Tucson.jpg"),
            new ImgText( "Hyundai Genesis", "/Images/Cars/genesis.jpg"),
            new ImgText( "Hyundai i30", "/Images/Cars/i30.jpg") };
        public Dictionary<string, decimal> Prices { get; set; } = new Dictionary<string, decimal>() { { "eco", 5.0m }, { "default", 10.0m }, { "business", 15.0m } };
    }
}

