   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  6    0ServiceDelivery.Views.Pages.UserView.DoOrderView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  DoOrderView�� � DataContext @   :ServiceDelivery.ViewModels.UserViewModels.DoOrderViewModel  .���� $
��Auto=�.��� $��Center=� � RowDefinitions �� $��50 ��� $
��Auto ��� $
��Auto ��� $
��Auto � � ColumnDefinitions �� $��2* ��� $��2* �.+��� $��0��$��0��$��2��   DoOrderTitle#���   $��Center=�$��Center=�$��20(�
������� �� Padding$ 10q��� $��1��$��0��$
��Auto��$
��Auto��  BtnMenu#���  $��20q����� *OpenDriverView+.����  �� Orientation$ Vertical=�.+��� $)��#/Images/ServiceTypesImgs/driver.jpg��$	��250��$	��250����   	CarDriver#���  
�������$��16(�$��Center=�$��Center=��� $��1��$��1��$
��Auto��$
��Auto��#���  $��20q����� *OpenDeliveryView+.���� $ Vertical=�.+��� $+��%/Images/ServiceTypesImgs/delivery.jpg��$	��250��$	��250����   DeliveryOrder#���  
�������$��16(�$��Center=�$��Center=��� $��2��$��0��$
��Auto��$
��Auto��#���  $��20q����� *OpenHomeOrderView+.���� $ Vertical=�.+��� $.��(/Images/ServiceTypesImgs/homeService.jpg��$	��250��$	��250����   	HomeOrder#���  
�������$��16(�$��Center=�$��Center=�