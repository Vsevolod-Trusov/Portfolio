
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ServiceDelivery.Commands
{
    public class DelegateCommand : ICommand
    {
        //реализация без IsAutomaticRequeryDisabled
        #region Constructors

        public DelegateCommand(Action executeMethod, Func<bool> canExecuteMethod = null)
        {
            if (executeMethod == null)
            {
                throw new ArgumentNullException("executeMethod");
            }
            
            _executeMethod = executeMethod;
            _canExecuteMethod = canExecuteMethod;
        }

        
        #endregion

        #region Data
        private readonly Action _executeMethod = null;
       
        private readonly Func<bool> _canExecuteMethod = null;

        #endregion

        #region Public Methods
        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object parameter)
        {
            if (_canExecuteMethod != null)
                return _canExecuteMethod();
            return true;
        }

        public void Execute(object parameter)
        {
            if (_executeMethod != null)
                _executeMethod();
        }

       

        #endregion

    }

    public class DelegateCommand<T> : ICommand
    {
        //реализация без IsAutomaticRequeryDisabled
        #region Constructors

        public DelegateCommand(Action<T> executeMethod, Func<T,bool> canExecuteMethod = null)
        {
            if (executeMethod == null)
            {
                throw new ArgumentNullException("executeMethod");
            }

            _executeMethod = executeMethod;
            _canExecuteMethod = canExecuteMethod;
        }


        #endregion

        #region Data
        private readonly Action<T> _executeMethod = null;

        private readonly Func<T,bool> _canExecuteMethod = null;

        #endregion

        #region Public Methods
        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }
        
        public bool CanExecute(T parameter)
        {
            if (_canExecuteMethod != null)
                return _canExecuteMethod(parameter);
            return true;
        }

        public void Execute(T parameter)
        {
            if (_executeMethod != null)
                _executeMethod(parameter);
        }

        public bool CanExecute(object parameter)
        {
            if (parameter == null &&
              typeof(T).IsValueType)
            {
                return (_canExecuteMethod == null);
            }
            return CanExecute((T)parameter);
        }

        public void Execute(object parameter)
        {
            Execute((T)parameter);
        }

        #endregion

    }

}
