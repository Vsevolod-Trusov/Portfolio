using ServiceDelivery.Helpers;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using WCFService.DataBase;
using WCFService.DBModel;

namespace WCFService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "DeliveryService" in both code and config file together.
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]//почитать
    public class DeliveryService : IDeliveryService
    {
        private List<UserProfile> OnlineUsers { get; set; } = new List<UserProfile>();
        public void AddUserCount(Guid Id)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile userProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == Id).FirstOrDefault();
                if (userProfile != null)
                {
                    OnlineUsers.Add(userProfile);
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public void RemoveUserCount(Guid Id)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile userProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == Id).FirstOrDefault();
                if (userProfile != null)
                {
                    OnlineUsers.RemoveAll(u => u.Id == userProfile.Id);
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public int GetOnlineUsersCount()
        {
            try
            {
                return OnlineUsers.Count;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return 0;
            }
        }
        public string CreateAdminEntry(string login, string password,string confirmPassword, string email)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                string validResult = ValidationRegistration(login, password, confirmPassword, " admin", email);
                if (validResult == "")
                {
                    return Registration(login, password, "admin", email, "/Images/Other/userIcon2.png");
                }
                else
                    return validResult;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }
        public string RegistrationWithValidation(string login, string password, string confirmPassword, string role, string email)
        {
            try
            {
                string validResult = ValidationRegistration(login, password, confirmPassword, role, email);
                if (validResult == "")
                {

                    return Registration(login, password, role, email);
                }
                else
                    return validResult;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            } 
        }
        public string ValidationAuthorisation(string login, string password, string role)
        {
            try
            {
                Regex loginRegex = new Regex(@"^(?![0-9]+$)([а-яА-Яa-zA-Z0-9]|@*|\$*)+$");
                Regex passwordRegex = new Regex(@"^([a-z]|[A-Z]|[а-я]|[А-Я]|[0-9]|-|_)*$");

                if (login.Length < 2)
                    return "Длина логина не менее 2x символов";
                else if (login.Length > 100)
                    return "Длина логина не более 100 символов";
                else if (password.Length > 200)
                    return "Длина пороля не более 200 символов";
                else if (password.Length < 5)
                    return "Длина пороля не менее 5 символов";
                else if (role == "")
                    return "Выберете значение в поле Role";
                else if (!loginRegex.IsMatch(login))
                    return "Неверный формат логина";
                else if (!passwordRegex.IsMatch(password))
                    return "Неверный формат пороля, дозволены символы, цифры и символы '-' и  '_'";

                return "";
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }

        public string ValidationRegistration(string login, string password, string confirmPassword, string role, string email)
        {
            try
            {
                Regex loginRegex = new Regex(@"^(?![0-9]+$)([а-яА-Яa-zA-Z0-9]|@*|\$*)+$");
                Regex passwordRegex = new Regex(@"^([a-z]|[A-Z]|[а-я]|[А-Я]|[0-9]|-|_)*$");
                Regex emailRegex = new Regex(@"^([a-zA-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$");

                if (login.Length < 2)
                    return "Длина логина не менее 2x символов";
               else if(login.Length > 100)
                    return "Длина логина не более 100 символов";
                else if (password.Length > 200)
                    return "Длина пороля не более 200 символов";
                else if (password.Length < 5)
                    return "Длина пороля не менее 5 символов";
                else if (role == "")
                    return "Выберете значение в поле Role";
                else if (!loginRegex.IsMatch(login))
                    return "Неверный формат логина";
                else if (!passwordRegex.IsMatch(password))
                    return "Неверный формат пороля, дозволены символы, цифры и символы '-' и  '_'";
                else if (!passwordRegex.IsMatch(password))
                    return "Неверный формат пороля, дозволены символы, цифры и символы '-' и  '_'";
                else if (password != confirmPassword)
                    return "Пароли не совпадают";
                else if (email.Length > 100)
                    return "Длина почты не более 100 символов";
                else if (!emailRegex.IsMatch(email))
                    return "Неверное знаечние в поле email";
                return "";

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }

        public string Registration(string login, string password, string role, string email, string avatarPath = "")
        {
            try
            {
                string result = "";
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                Image img = new Image();
                img.ImageId = Guid.NewGuid();

                if (avatarPath != "")
                    img.ImagePath = avatarPath;
                else
                    img.ImagePath = "/Images/Other/userIcon2.png";//думаю нужно будет задать относительный путь

                string hash = HashManager.GetHash(password);
                UserProfile user = serviceBaseCase.UserProfiles.Where(a => a.UsersLogin.Login == login).FirstOrDefault();

                if (user == null)
                {
                    serviceBaseCase.UserProfiles.Add(new UserProfile()
                    {
                        Id = Guid.NewGuid(),
                        UsersLogin = new UserLogin() { Id = Guid.NewGuid(), Login = login, PasswordHash = HashManager.GetHash(password) },
                        UserRole = role,
                        Avatar = img.ImageId,
                        Email = email,
                        Images = img
                    });
                    serviceBaseCase.SaveChanges();
                }
                else return "Учетная запись с таким логином уже существует. Измените логин.";


                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }
        public string AuthorisationWithValidation(string login, string password, string role)
        {
            try
            {
                string validResult = ValidationAuthorisation(login, password, role);
                if (validResult == "")
                {
                    return Authorisation(login, password, role); ;
                }
                else
                    return validResult;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }
        public string Authorisation(string login, string password, string role)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                string hash = HashManager.GetHash(password);
                UserProfile user = serviceBaseCase.UserProfiles.Where(a => a.UsersLogin.Login == login
                                            && a.UsersLogin.PasswordHash == hash
                                             && a.UserRole == role).FirstOrDefault();
                if (user != null)
                {
                    return "";
                }
                else
                    return "Такого пользователя нет. Зарегистрируйтесь";
            }
             catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }

        public string GetUserAvatarPath(string login, string password, string role)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                string hash = HashManager.GetHash(password);

                UserProfile user = serviceBaseCase.UserProfiles.Where(a => a.UsersLogin.Login == login
                                            && a.UsersLogin.PasswordHash == hash
                                             && a.UserRole == role).FirstOrDefault();

                if (user != null)
                {
                    Image img = serviceBaseCase.Images.Where(i => i.ImageId == user.Images.ImageId).FirstOrDefault();
                    return img.ImagePath;
                }
                else
                    return "Такого пользователя нет.";
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return e.Message;
            }
        }

        public ObservableCollection<Dictionary<string, string>> GetOrders()
        {
            try
            {
                //как бы тебе не хотелось не менять!!!
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                foreach (ServiceOrder order in serviceBaseCase.ServiceOrders)
                {

                    Dictionary<string, string> serviceOrder = new Dictionary<string, string>();

                    serviceOrder.Add("id", order.Id.ToString());
                    serviceOrder.Add("customer", order.CustomerProfile.UsersLogin.Login);
                    if (order.ExecutorProfile == null)
                        serviceOrder.Add("executor", "");

                    else
                        serviceOrder.Add("executor", order.ExecutorProfile.UsersLogin.Login);
                    serviceOrder.Add("description", order.Desctiption);
                    serviceOrder.Add("deadline", order.Deadline.ToString());
                    serviceOrder.Add("orderDate", order.DataOrder.ToString());
                    serviceOrder.Add("price", Decimal.Round((decimal)order.Price, 2).ToString());
                    serviceOrder.Add("status", order.ExecutionStatus.ToString());
                    serviceOrder.Add("category", order.ServiceType.Category);

                    result.Add(serviceOrder);
                }

                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
     

        public ObservableCollection<Dictionary<string, string>> GetNecessaryStaff(string category)
        {

            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                foreach (UserProfile staff in serviceBaseCase.UserProfiles.Where(u => u.UserRole == "staff"))
                {

                    foreach (ServiceType type in staff.ServiceType)
                    {

                        if (type.Category == category)//не понимаю по категории иди заголовку подумать
                        {
                            Dictionary<string, string> profile = new Dictionary<string, string>();
                            profile.Add("id", staff.Id.ToString());
                            profile.Add("login", staff.UsersLogin.Login);
                            profile.Add("countOrders", staff.WaitingOrder.Count.ToString());

                            result.Add(profile);
                        }
                    }
                }

                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public ObservableCollection<Dictionary<string, string>> GetStaffForReview(Guid customerId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();
                ObservableCollection<string> logins = new ObservableCollection<string>();
                foreach (ServiceOrder order in serviceBaseCase.ServiceOrders.Where(u => u.CustomerProfile.Id == customerId && u.ExecutionStatus == "completed"))
                {
                    if (!logins.Contains(order.ExecutorProfile.UsersLogin.Login))
                    {
                       
                        if (order.ExecutorProfile != null)
                        {
                            logins.Add(order.ExecutorProfile.UsersLogin.Login);

                            Dictionary<string, string> profile = new Dictionary<string, string>();
                            profile.Add("id", order.ExecutorProfile.Id.ToString());
                            profile.Add("login", order.ExecutorProfile.UsersLogin.Login);
                            profile.Add("avatarPath", order.ExecutorProfile.Images.ImagePath);
                            profile.Add("email", order.ExecutorProfile.Email);

                            result.Add(profile);
                        }
                    }
                }
                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public void ChangeOrder(Guid staffId, Guid ordersId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();

                ServiceOrder order = serviceBaseCase.ServiceOrders.Where(u => u.Id == ordersId).FirstOrDefault();

                if (order != null)
                {

                    UserProfile staff = serviceBaseCase.UserProfiles.Where(u => u.Id == staffId).FirstOrDefault();
                    if (staff != null)
                    {
                        order.ExecutorProfile = staff;
                        order.ExecutionStatus = "processed";
                    }

                }
                serviceBaseCase.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }


        public ObservableCollection<Dictionary<string, string>> GetFilteredOrdersByStatus(string parameter)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                foreach (ServiceOrder order in serviceBaseCase.ServiceOrders.Where(u => u.ExecutionStatus.Equals(parameter)))
                {
                    Dictionary<string, string> serviceOrder = new Dictionary<string, string>();


                    serviceOrder.Add("id", order.Id.ToString());
                    serviceOrder.Add("customer", order.CustomerProfile.UsersLogin.Login);
                    serviceOrder.Add("email", order.CustomerProfile.Email);
                    if (order.ExecutorProfile == null)
                        serviceOrder.Add("executor", "");

                    else
                        serviceOrder.Add("executor", order.ExecutorProfile.UsersLogin.Login);
                    serviceOrder.Add("description", order.Desctiption);
                    serviceOrder.Add("deadline", order.Deadline.Value.ToShortDateString());
                    serviceOrder.Add("orderDate", order.DataOrder.Value.ToShortDateString());
                    serviceOrder.Add("price", Decimal.Round((decimal)order.Price, 2).ToString());
                    serviceOrder.Add("status", order.ExecutionStatus.ToString());
                    serviceOrder.Add("category", order.ServiceType.Category);

                    result.Add(serviceOrder);
                }

                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public ObservableCollection<Dictionary<string, string>> GetFilteredWaitingOrdersByStatus(string parameter, Guid executorId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                foreach (ServiceOrder order in serviceBaseCase.UserProfiles.Where(i => i.Id == executorId).FirstOrDefault().WaitingOrder.Where(u => u.ExecutionStatus.Equals(parameter)))
                {
                    Dictionary<string, string> serviceOrder = new Dictionary<string, string>();

                    serviceOrder.Add("id", order.Id.ToString());
                    serviceOrder.Add("customer", order.CustomerProfile.UsersLogin.Login);
                    serviceOrder.Add("email", order.CustomerProfile.Email);
                    serviceOrder.Add("description", order.Desctiption);
                    serviceOrder.Add("deadline", order.Deadline.Value.ToShortDateString());
                    serviceOrder.Add("orderDate", order.DataOrder.Value.ToShortDateString());
                    serviceOrder.Add("price", Decimal.Round((decimal)order.Price, 2).ToString());
                    serviceOrder.Add("status", order.ExecutionStatus.ToString());
                    serviceOrder.Add("category", order.ServiceType.Category);

                    result.Add(serviceOrder);
                }

                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public void SendOrder(string description, decimal price, DateTime deadline, string category, Guid customerId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ServiceOrder newOrder = new ServiceOrder()
                {
                    Id = Guid.NewGuid(),
                    Desctiption = description,
                    DataOrder = DateTime.Now,
                    Deadline = deadline,
                    CustomerProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == customerId).FirstOrDefault(),
                    ExecutorProfile = null,
                    ServiceType = serviceBaseCase.ServiceTypes.Where(u => u.Category == category).FirstOrDefault(),
                    Price = price,
                    ExecutionStatus = "unprocessed"
                };
                serviceBaseCase.ServiceOrders.Add(newOrder);
                serviceBaseCase.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public Guid GetId(string Login, string Password, string Role)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                Guid result = Guid.Empty;
                string hash = HashManager.GetHash(Password);
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.UsersLogin.Login == Login && u.UsersLogin.PasswordHash == hash && u.UserRole == Role).FirstOrDefault();
                if (profile != null)
                    result = profile.Id;
                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return Guid.Empty;
            }
        }

        public void CreateNewServiceType(string Category = null, decimal Price = 0.0m) 
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ServiceType driving = new ServiceType() { Id = Guid.NewGuid(), Title = "driver", Category = "Car driver", Price = 5.0m };
                serviceBaseCase.ServiceTypes.Add(driving);

                ServiceType delivery = new ServiceType() { Id = Guid.NewGuid(), Title = "items", Category = "Delivery", Price = 20.0m };
                serviceBaseCase.ServiceTypes.Add(delivery);

                ServiceType housing = new ServiceType() { Id = Guid.NewGuid(), Title = "house", Category = "Housework", Price = 30.0m };
                serviceBaseCase.ServiceTypes.Add(housing);

                serviceBaseCase.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void CreateReview(string Content, Guid CustomerId, Guid ExecutorId, string PhotoPath, int Estimation)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                Review newReview = new Review()
                {
                    Id = Guid.NewGuid(),
                    Content = Content,
                    Estimation = Estimation,
                    Images = new Image() { ImageId = Guid.NewGuid(), ImagePath = PhotoPath },
                    UserProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == CustomerId).FirstOrDefault()
                };
                serviceBaseCase.Reviews.Add(newReview);
                serviceBaseCase.UserProfiles.Where(u => u.Id == ExecutorId).FirstOrDefault().Review.Add(newReview);
                serviceBaseCase.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public ObservableCollection<Dictionary<string, string>> GetCustomerOrders(Guid CustomerId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                UserProfile customerProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == CustomerId).FirstOrDefault();
                if (customerProfile != null)
                {
                    foreach (ServiceOrder order in customerProfile.CreatedOrder)
                    {
                        Dictionary<string, string> serviceOrder = new Dictionary<string, string>();

                        serviceOrder.Add("id", order.Id.ToString());
                        serviceOrder.Add("customer", order.CustomerProfile.UsersLogin.Login);
                        if (order.ExecutorProfile == null)
                            serviceOrder.Add("executor", "");

                        else
                            serviceOrder.Add("executor", order.ExecutorProfile.UsersLogin.Login);
                        serviceOrder.Add("description", order.Desctiption);
                        serviceOrder.Add("deadline", order.Deadline.Value.ToShortDateString());
                        serviceOrder.Add("orderDate", order.DataOrder.Value.ToShortDateString());
                        serviceOrder.Add("price", Decimal.Round((decimal)order.Price, 2).ToString());
                        serviceOrder.Add("status", order.ExecutionStatus.ToString());
                        serviceOrder.Add("category", order.ServiceType.Category);

                        result.Add(serviceOrder);
                    }
                }
                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public ObservableCollection<Dictionary<string, string>> GetCustomerFilteredOrders(Guid profileId, string parameter)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                UserProfile customerProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == profileId).FirstOrDefault();
                if (customerProfile != null)
                {
                    foreach (ServiceOrder order in customerProfile.CreatedOrder.Where(o => o.ExecutionStatus == parameter))
                    {
                        Dictionary<string, string> serviceOrder = new Dictionary<string, string>();

                        serviceOrder.Add("id", order.Id.ToString());
                        serviceOrder.Add("customer", order.CustomerProfile.UsersLogin.Login);
                        if (order.ExecutorProfile == null)
                            serviceOrder.Add("executor", "");

                        else
                            serviceOrder.Add("executor", order.ExecutorProfile.UsersLogin.Login);
                        serviceOrder.Add("description", order.Desctiption);
                        serviceOrder.Add("deadline", order.Deadline.Value.ToShortDateString());
                        serviceOrder.Add("orderDate", order.DataOrder.Value.ToShortDateString());
                        serviceOrder.Add("price", Decimal.Round((decimal)order.Price, 2).ToString());
                        serviceOrder.Add("status", order.ExecutionStatus.ToString());
                        serviceOrder.Add("category", order.ServiceType.Category);

                        result.Add(serviceOrder);
                    }
                }
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public ObservableCollection<Dictionary<string, string>> GetWaitingOrders(Guid ExecutorId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                UserProfile customerProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == ExecutorId).FirstOrDefault();
                if (customerProfile != null)
                {
                    foreach (ServiceOrder order in customerProfile.WaitingOrder.Where(u => u.ExecutionStatus == "processed" || u.ExecutionStatus == "completed"))
                    {
                        Dictionary<string, string> serviceOrder = new Dictionary<string, string>();

                        serviceOrder.Add("id", order.Id.ToString());
                        serviceOrder.Add("customer", order.CustomerProfile.UsersLogin.Login);
                        serviceOrder.Add("email", order.CustomerProfile.Email);

                        serviceOrder.Add("description", order.Desctiption);
                        serviceOrder.Add("deadline", order.Deadline.Value.ToShortDateString());
                        serviceOrder.Add("orderDate", order.DataOrder.Value.ToShortDateString());
                        serviceOrder.Add("price", Decimal.Round((decimal)order.Price, 2).ToString());
                        serviceOrder.Add("status", order.ExecutionStatus.ToString());
                        serviceOrder.Add("category", order.ServiceType.Category);

                        result.Add(serviceOrder);
                    }
                }
                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }


        public void CompleteOrder(Guid ordersId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();

                ServiceOrder order = serviceBaseCase.ServiceOrders.Where(u => u.Id == ordersId).FirstOrDefault();

                if (order != null)
                {
                    order.ExecutionStatus = "completed";
                }
                serviceBaseCase.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void ChangeStaffProfile(Guid staffProfileId, string serviceTypeName)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == staffProfileId).FirstOrDefault();
                if (profile != null)
                {
                    profile.ServiceType.Add(serviceBaseCase.ServiceTypes.Where(s => s.Category == serviceTypeName).FirstOrDefault());
                    serviceBaseCase.SaveChanges();
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public ObservableCollection<string> GetServiceTypes(Guid executorId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<string> result = new ObservableCollection<string>();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == executorId).FirstOrDefault();
                if (profile != null)
                {
                    foreach (ServiceType type in serviceBaseCase.ServiceTypes)
                    {
                        if (!profile.ServiceType.Contains(type))
                        {
                            result.Add(type.Category);
                        }
                    }
                }
                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        
        public int CountExecutorServiceTypes(Guid executorId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == executorId).FirstOrDefault();
                if (profile != null)
                {
                    return profile.ServiceType.Count();
                }
                return -1;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }
        }

        public ObservableCollection<Dictionary<string, string>> GetReviews(Guid executorId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                ObservableCollection<Dictionary<string, string>> result = new ObservableCollection<Dictionary<string, string>>();

                UserProfile customerProfile = serviceBaseCase.UserProfiles.Where(u => u.Id == executorId).FirstOrDefault();
                if (customerProfile != null)
                {
                    foreach (Review review in customerProfile.Review)
                    {
                        Dictionary<string, string> note = new Dictionary<string, string>();

                        note.Add("id", review.Id.ToString());
                        note.Add("content", review.Content);
                        note.Add("estimation", review.Estimation.ToString());
                        note.Add("imagePath", review.Images.ImagePath);

                        result.Add(note);
                    }
                }
                return result;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
        public int CountReviews(Guid executorId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == executorId).FirstOrDefault();
                if (profile != null)
                {
                    return profile.Review.Count();
                }
                return -1;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }

        }
        public void DeleteReview(Guid executorId, Guid reviewId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == executorId).FirstOrDefault();
                Review review = serviceBaseCase.Reviews.Where(u => u.Id == reviewId).FirstOrDefault();
                if (profile != null && review != null)
                {
                    profile.Review.Remove(review);
                    serviceBaseCase.Reviews.Remove(review);
                    serviceBaseCase.SaveChanges();
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void ChangeAvatar(Guid profileId, string ImagePath)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == profileId).FirstOrDefault();
                if (profile != null)
                {
                    profile.Images.ImagePath = ImagePath;
                    serviceBaseCase.SaveChanges();
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void ChangeEmail(Guid profileId, string email)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == profileId).FirstOrDefault();
                if (profile != null)
                {
                    profile.Email = email;
                    serviceBaseCase.SaveChanges();
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public string GetEmail(Guid profileId)
        {
            try
            {
                ServiceBaseCase serviceBaseCase = new ServiceBaseCase();
                UserProfile profile = serviceBaseCase.UserProfiles.Where(u => u.Id == profileId).FirstOrDefault();
                if (profile != null)
                {
                    return profile.Email;
                }
                return "";
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
