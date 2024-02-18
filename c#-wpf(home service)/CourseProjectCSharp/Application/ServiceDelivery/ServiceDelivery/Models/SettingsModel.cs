using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceDelivery.Models
{
    public class SettingsModel
    {
        public bool ThemeFlag { get; set; } = true; //true - light false- dark
        public bool LangFlag { get; set; } = true; //true - eng false- ru
        public string ThemeContent { get; set; } = "Light";
        public string LangContent { get; set; } = "Eng";
    }
}
