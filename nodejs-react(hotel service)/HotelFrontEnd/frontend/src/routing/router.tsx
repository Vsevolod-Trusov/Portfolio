import { createBrowserRouter, Outlet } from 'react-router-dom';
import ErrorPage from '../error-page';
import React from 'react';
import MainPage from '../pages/MainPage/MainPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SearchResultsRoom from '../pages/UserPages/Room/SearchResultsRoom/SearchResultsRoom';
import RoomServicePage from '../pages/UserPages/Room/RoomServicePage/RoomServicePage';
import RoomOrderPage from '../pages/UserPages/Room/RoomOrderPage/RoomOrderPage';
import Navbar from '../components/composites/Navbar/Navbar';
import OrderMealPage from '../pages/UserPages/Meal/OrderMealPage/OrderMealPage';
import MealMenu from '../components/composites/MealMenu/MealMenu';
import ConfirmMealOrder from '../pages/UserPages/Meal/ConfirmMealOrder/ConfirmMealOrder';
import OrderTourPage from '../pages/UserPages/Tour/OrderTourPage/OrderTourPage';
import TourMenu from '../components/composites/TourMenu/TourMenu';
import ConfirmTourOrder from '../pages/UserPages/Tour/ConfirmTourOrder/ConfirmTourOrder';
import FeedbackPage from '../pages/UserPages/Feedback/FeedbackPage/FeedbackPage';
import ProfilePage from '../pages/UserPages/Profile/ProfilePage';
import HobbyPage from '../pages/UserPages/Hobbies/HobbyPage/HobbyPage';
import RoomPage from '../pages/AdminPages/Room/RoomPage/RoomPage';
import AdminOutlet from '../components/composites/AdminOutlet/AdminOutlet';
import MealPage from '../pages/AdminPages/Meal/MealPage';
import TourPage from '../pages/AdminPages/Tour/TourPage/TourPage';
import HobbiesPage from '../pages/AdminPages/Hobby/HobbyPage/HobbyPage';
import NewsForm from '../pages/AdminPages/News/NewsForm';
import PlacePage from '../pages/AdminPages/Place/PlacePage';
import AdminRoomServicePage from '../pages/AdminPages/RoomService/RoomServicePage';

export const router = createBrowserRouter([
  {
    path: '/HotelFrontEnd/',
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/HotelFrontEnd/',
        element: <AdminOutlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/HotelFrontEnd/',
            element: <MainPage />,
            errorElement: <ErrorPage />,
          },
          //user routes
          {
            path: '/HotelFrontEnd/search_room',
            element: <SearchResultsRoom />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/room_service',
            element: <RoomServicePage />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/HotelFrontEnd/room_order',
            element: <RoomOrderPage />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/meal_order',
            element: <OrderMealPage />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/meal_menu',
            element: <MealMenu />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/confirm_meal_order',
            element: <ConfirmMealOrder />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/order_tour',
            element: <OrderTourPage />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/tour_menu',
            element: <TourMenu />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/confirm_tour_order',
            element: <ConfirmTourOrder />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/order_hobby',
            element: <HobbyPage />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/feedback',
            element: <FeedbackPage />,
            errorElement: <ErrorPage />,
          },

          {
            path: '/HotelFrontEnd/profile',
            element: <ProfilePage />,
            errorElement: <ErrorPage />,
          },
        ],
      },

      {
        path: '/HotelFrontEnd/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
      },

      //admin routes
      {
        path: '/HotelFrontEnd/room',
        element: <RoomPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '/HotelFrontEnd/admin/room_service',
        element: <AdminRoomServicePage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '/HotelFrontEnd/place',
        element: <PlacePage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '/HotelFrontEnd/meal',
        element: <MealPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '/HotelFrontEnd/tour',
        element: <TourPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '/HotelFrontEnd/hobby',
        element: <HobbiesPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: '/HotelFrontEnd/news',
        element: <NewsForm />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/HotelFrontEnd/signIn',
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/HotelFrontEnd/signUp',
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);
