   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]3clr-namespace:ServiceDelivery.Views.Pages.AdminView%ServiceDelivery.Views.Pages.AdminView  5      g8clr-namespace:ServiceDelivery.ViewModels.AdminViewModels*ServiceDelivery.ViewModels.AdminViewModels  5      <    6ServiceDelivery.Views.Pages.AdminView.OnllineUsersView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Elocal3clr-namespace:ServiceDelivery.Views.Pages.AdminView     5      N	viewModel8clr-namespace:ServiceDelivery.ViewModels.AdminViewModels     5        N� Title$  OnllineUsersView��5
       � DataContext 5      E   ?ServiceDelivery.ViewModels.AdminViewModels.OnlineUsersViewModel  5   
   .��5      � ��5   
   �� 5       �� ImageSource$&  \Images\Logo\helloClientLogo.png��6    �� Opacity$
 0.07Q�6H    � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��* �6   .+�5   
   �� $��0��6   $��0��6!      OnlineUsers#���   5      $��20(�5       �� Padding$ 
10 30 0 30q�6"   $
��Wrap=�67   $��Right=�5      
�������5      �� 5!   
   $��0��6   $��1��6!   $��20(�5#      $
��Left=�5$      $ 	10 30 0 0q�5%      
���������5"      �� *Count+5&      5(      5)      