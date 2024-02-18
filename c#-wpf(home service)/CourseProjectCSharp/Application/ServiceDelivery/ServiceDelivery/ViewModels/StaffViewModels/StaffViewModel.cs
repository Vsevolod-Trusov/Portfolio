using ServiceDelivery.Commands;
using ServiceDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace ServiceDelivery.ViewModels
{
    public class StaffViewModel:ViewModelBase
    {
        private HelloClientStaffModel staffModel;

        public StaffViewModel()
        {
            staffModel = new HelloClientStaffModel();
        }

        //
        //Изменяемые Свойства
        //

        public Page Page
        {
            get => staffModel.Page;
            set
            {
                staffModel.Page = value;
                OnPropertyChanged("Page");
            }
        }
     
    }
}
