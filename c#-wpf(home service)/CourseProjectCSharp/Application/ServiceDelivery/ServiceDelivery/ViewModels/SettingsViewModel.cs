using ServiceDelivery.Commands;
using ServiceDelivery.Helpers;
using ServiceDelivery.Models;
using ServiceDelivery.Views.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace ServiceDelivery.ViewModels
{
    public class SettingsViewModel: ViewModelBase
    {
        private SettingsModel settingsModel;

        public SettingsViewModel()
        {
            settingsModel = new SettingsModel();
        }
        public string ThemeContent
        {
            get
            {
                return settingsModel.ThemeContent;
            }
            set
            {
                settingsModel.ThemeContent = value;
                OnPropertyChanged("ThemeContent");
            }
        }

        public string LangContent
        {
            get
            {
                return settingsModel.LangContent;
            }
            set
            {
                settingsModel.LangContent = value;
                OnPropertyChanged("LangContent");
            }
        }
        private DelegateCommand _switchTheme;

        public ICommand SwitchTheme
        {
            get
            {
                if (_switchTheme == null)
                {
                    _switchTheme = new DelegateCommand(Theme);
                }
                return _switchTheme;
            }
        }

        public void Theme()
        {
            ResourceDictionary dictionary = new ResourceDictionary();
            ResourceDictionary dictionary2 = new ResourceDictionary();
            ResourceDictionary oldDictionary = new ResourceDictionary();

            if (settingsModel.ThemeFlag)
            {
                ThemeContent = "Dark";
                dictionary.Source = new Uri(String.Format("/Resources/Themes/Theme.Black.xaml"), UriKind.Relative);
                dictionary2.Source = new Uri(String.Format("/MaterialDesignColors;component/Themes/Recommended/Primary/MaterialDesignColor.Grey.xaml"), UriKind.Relative);
                
            }
            else
            { 
                ThemeContent = "Light";
                dictionary.Source = new Uri(String.Format("/Resources/Themes/Theme.Light.xaml"), UriKind.Relative);
               dictionary2.Source = new Uri(String.Format("/MaterialDesignColors;component/Themes/Recommended/Primary/MaterialDesignColor.Yellow.xaml"), UriKind.Relative);
            }

            settingsModel.ThemeFlag = !settingsModel.ThemeFlag;

            oldDictionary = Application.Current.Resources.MergedDictionaries.First(
                    n => n.Source.OriginalString.StartsWith("/Resources/Themes/Theme."));

            int index = Application.Current.Resources.MergedDictionaries.IndexOf(oldDictionary);
            Application.Current.Resources.MergedDictionaries.Remove(oldDictionary);
            Application.Current.Resources.MergedDictionaries.Insert(index, dictionary);

            oldDictionary = Application.Current.Resources.MergedDictionaries.First(
                   n => n.Source.OriginalString.StartsWith("/MaterialDesignColors;component/Themes/Recommended/Primary/MaterialDesignColor."));

            index = Application.Current.Resources.MergedDictionaries.IndexOf(oldDictionary);
            Application.Current.Resources.MergedDictionaries.Remove(oldDictionary);
            Application.Current.Resources.MergedDictionaries.Insert(index, dictionary2);
        }

        private DelegateCommand _switchLang;

        public ICommand SwitchLang
        {
            get
            {
                if (_switchLang == null)
                {
                    _switchLang = new DelegateCommand(Lang);
                }
                return _switchLang;
            }
        }

        public void Lang()
        {
            ResourceDictionary dictionary = new ResourceDictionary();
            ResourceDictionary oldDictionary = new ResourceDictionary();
            if (settingsModel.LangFlag)
            {
                LangContent = "Ru";
                dictionary.Source = new Uri(String.Format("/Resources/Languages/Lang.Ru.xaml"), UriKind.Relative);
            }
            else
            { 
                LangContent = "Eng";
                dictionary.Source = new Uri(String.Format("/Resources/Languages/Lang.En.xaml"), UriKind.Relative);
            }

            settingsModel.LangFlag = !settingsModel.LangFlag;
            oldDictionary = Application.Current.Resources.MergedDictionaries.First(
                  n => n.Source.OriginalString.StartsWith("/Resources/Languages/Lang."));

            int index = Application.Current.Resources.MergedDictionaries.IndexOf(oldDictionary);
            Application.Current.Resources.MergedDictionaries.Remove(oldDictionary);
            Application.Current.Resources.MergedDictionaries.Insert(index, dictionary);
        }
    }
}
