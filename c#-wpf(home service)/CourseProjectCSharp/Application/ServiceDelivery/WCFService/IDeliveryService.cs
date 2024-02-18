using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WCFService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IDeliveryService" in both code and config file together.
    [ServiceContract]
    public interface IDeliveryService
    {
        [OperationContract]
        void AddUserCount(Guid Id);
        [OperationContract]
        void RemoveUserCount(Guid Id);
        [OperationContract]
        int GetOnlineUsersCount();
        [OperationContract]
        string CreateAdminEntry(string login, string password, string confirmPassword,string email);
        [OperationContract]
            string Registration(string login, string password, string role, string email, string avatarPath = "");
            [OperationContract]
            string RegistrationWithValidation(string login, string password, string confirmPassword, string role, string email);
            [OperationContract]
            string ValidationAuthorisation(string login, string password, string role);
            [OperationContract]
            string ValidationRegistration(string login, string password, string confirmPassword, string role, string email);
            [OperationContract]
            string Authorisation(string login, string password, string role);
            [OperationContract]
            string AuthorisationWithValidation(string login, string password, string role);

            [OperationContract]
            string GetUserAvatarPath(string login, string password, string role);
            [OperationContract]
            ObservableCollection<Dictionary<string, string>> GetOrders();

            [OperationContract]
            ObservableCollection<Dictionary<string, string>> GetNecessaryStaff(string category);
            [OperationContract]
            void ChangeOrder(Guid staffId, Guid ordersId);
            [OperationContract]
            ObservableCollection<Dictionary<string, string>> GetFilteredOrdersByStatus(string parameter);
            [OperationContract]
            ObservableCollection<Dictionary<string, string>> GetFilteredWaitingOrdersByStatus(string parameter, Guid executorId);

            [OperationContract]
            void SendOrder(string description, decimal price, DateTime deadline, string category, Guid customerId);

            [OperationContract]
            Guid GetId(string Login, string Password, string Role);
            [OperationContract]
            void CreateNewServiceType(string Category = null, decimal Price = 0.0m);
        [OperationContract]
        ObservableCollection<Dictionary<string, string>> GetStaffForReview(Guid customerId);
        [OperationContract]
            void CreateReview(string Content, Guid CustomerId, Guid ExecutorId, string PhotoPath, int Estimation);
            [OperationContract]
            ObservableCollection<Dictionary<string, string>> GetCustomerOrders(Guid Id);
            [OperationContract]
            ObservableCollection<Dictionary<string, string>> GetWaitingOrders(Guid ExecutorId);

            [OperationContract]
            void CompleteOrder(Guid ordersId);

            //начинаю писать комментарии тк уже слишком много всего
            [OperationContract]
            void ChangeStaffProfile(Guid staffProfileId, string serviceTypeName);//метод для добавления типа сервиса предоставляемого ролью staff

            [OperationContract]
            ObservableCollection<string> GetServiceTypes(Guid executorId);//метод для получения всех типов сервиса предоставляемых ролью staff
        [OperationContract]
        int CountExecutorServiceTypes(Guid executorId);//посчитать сколько сервисов он предоставляет

        [OperationContract]
        ObservableCollection<Dictionary<string, string>> GetReviews(Guid executorId);//метод для получения отзывов к конкретному исполнителю
        [OperationContract]
       int CountReviews(Guid executorId);//метод для подсчета количества отзывов к конкретному исполнителю    
        [OperationContract]
            void DeleteReview(Guid executorId, Guid reviewId);//метод удаления review у исполнителя
            [OperationContract]
            void ChangeAvatar(Guid profileId, string ImagePath);//метод изменения аватарки
            [OperationContract]
            void ChangeEmail(Guid profileId, string email);//метод для изменения eMail
            [OperationContract]
            string GetEmail(Guid profileId);//метод для изменения eMail

        [OperationContract]
        ObservableCollection<Dictionary<string, string>> GetCustomerFilteredOrders(Guid profileId, string parameter);//метод для получения unprocessed processed and completed orders
    }
}
