using ServiceDelivery.Views.Pages;
using ServiceDelivery.Views.Pages.AdminView;
using ServiceDelivery.Views.Pages.UserView;
using System;
using System.Collections.Generic;
using System.Windows.Controls;
using ServiceDelivery.Views.Pages.Staff;
using System.Windows;
using ServiceDelivery.Views;

namespace ServiceDelivery.Helpers
{
    public static class MainFrameNavigator
    {
        public static Guid Id { get; set; } = Guid.Empty;
        public static string Login { get; set; }
        public static string Role { get; set; }
        public static string Password { get; set; }
        public static string IamgePath { get; set; }
        public static string Email { get; set; }

        ////руализоваь паттерн синглтон
        private static Dictionary<string, Page> pages = new Dictionary<string, Page>();

        private static readonly Page userView;
        private static readonly Page staffView;
        private static readonly Page adminView;
        //admin's pages
        private static readonly Page createdOderView;
        private static readonly Page settingsView;
        private static readonly Page editView;
        private static readonly Page adminProfile;
        //user's pages
        private static readonly Page doOrderView;
        private static readonly Page reviewView;
        private static readonly Page driverView;
        private static readonly Page deliveryView;
        private static readonly Page homeOrderView;
        private static readonly Page userOrdersView;
        //staff's pages
        private static readonly Page processedOrdersView;
        private static readonly Page executorReviewView;
        private static readonly Page staffProfileView;
        private static readonly Page userProfileView;
        
        private static readonly Page aboutUsPage;
        private static readonly Page warningView;
        private static readonly Page noReviewsView;
        private static readonly Page onlineUsers;
        //static constructor
        static MainFrameNavigator()
        {
            Id = Guid.Empty;
            
            userView = new UserView();
            staffView = new StaffView();
            adminView = new AdminView();
            
            createdOderView = new CreatedOrderView();
            settingsView = new SettingView();
            editView = new EditView();
            adminProfile = new AdminProfileView();

            doOrderView = new DoOrderView();
            reviewView = new ReviewView();
            driverView = new DriverOrderView();
            deliveryView = new DeliveryView();
            homeOrderView = new HomeOrderView();
            userOrdersView = new OrdersView();

            processedOrdersView = new ProcessedOrdersView();
            executorReviewView = new ExecutorReviewView();
            staffProfileView = new StaffProfileView();
            userProfileView = new UserProfileView();

            aboutUsPage = new AboutUsView();
            warningView = new WarningView();
            noReviewsView = new NoReviewsView();
            onlineUsers = new OnllineUsersView();

            pages.Add("user", userView);
            pages.Add("admin", adminView);
            pages.Add("staff", staffView);
            
            pages.Add("createdOrders", createdOderView);
            pages.Add("settings", settingsView);
            pages.Add("edit", editView);
            pages.Add("adminProfile", adminProfile);
            
            pages.Add("doOrder", doOrderView);
            pages.Add("review", reviewView);
            pages.Add("carDriver", driverView);
            pages.Add("delivery", deliveryView);
            pages.Add("homeOrder", homeOrderView);
            pages.Add("userOrders", userOrdersView);

            pages.Add("processedOrders", processedOrdersView);
            pages.Add("executorReview", executorReviewView);
            pages.Add("staffProfile", staffProfileView);
            pages.Add("userProfile", userProfileView);

            pages.Add("aboutUs", aboutUsPage);
            pages.Add("warning", warningView);
            pages.Add("noReviews", noReviewsView);
            pages.Add("onlineUsers", onlineUsers);
        }



        public static Page GetPage(string pageName)
        {
            return pages[pageName];
        }

    }
}
