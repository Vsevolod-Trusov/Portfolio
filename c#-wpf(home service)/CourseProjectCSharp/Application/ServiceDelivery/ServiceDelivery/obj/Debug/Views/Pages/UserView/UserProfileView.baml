   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5      e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5      :    4ServiceDelivery.Views.Pages.UserView.UserProfileView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     5      M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5        N� Title$  UserProfileView��5       � DataContext 5      D   >ServiceDelivery.ViewModels.UserViewModels.UserProfileViewModel  5   
   .��5      � $��Center=�6    � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $
��0.5* �6   �� 5      $��* �6   .+�5   
   �� $��0��6   $��0��6   $	��Top=�5      
�������$��1q�5      $
��Left=�5      $	��180��5      $	��180��5       $	��360��5!      $	��360��5"      ._�5$      �� -   5        $��BorderImage��5%      $��Center=�5&      $	��180��5'      $	��180��5(      $	��360��5)      $	��360��5*      .+�5,      �� -   5        $��
ImageTitle��5.         DownloadImg#���   5-      
�������$��16(�50      $��Stretch=�51      $��Stretch=�52      $��Center=�53      $��Center=�54      $	��180��55      $	��180��56      $	��360��57      $	��360��58      �� 5:      -   5        $��DownloadImage��5:      ��5;      �� *	ImagePath+5=      5>      � 5?   
   $��1��6    5@      �� 5A      $
��0.2* �6    �� 5B      $��* �6     5D      �� 5E      $��* �6#   �� 5F      $��* �6#   .+�5I      �� $��0��6   $��0��6%     BtnMenu#���  5J      $	��Top=�5L        	SelectImg#���  5M      
�������$��14(�5O      ��5K      �� *	SelectImg+5O      �� 5P      $��1��6   $��0��6%   #���  5Q      $	��Top=�5S        Save#���  5T      
�������$��14(�5V      ��5R      �� *SaveSelectedImage+5V      � 5Y      $��1��6   $��0��6$   $��2��64    5Z      �� 5[      $
��0.4* �6(   �� 5\      $��2* �6(    5^      �� 5_      $
��Auto �6+   �� 5`      $��* �6+   .+�5c      �� $��14(�6    
�������$��0��6A   $��0��6N     
EmailTitle#���  5d      $��Center=�5e       $��Center=�5f       �� 5g      $��14(�6   $��0��6)   $��1��66     FieldTextColor#���  5i      $��Center=�5j       �� 
IsReadOnly . ��5h      �� *CurrentEmail+5k      �� 5m      $��1��6   $��0��6'   $
��Left=�5o      $	��150��5p      $	��150��5q      $	��Top=�5r      #���  5s      ��5n      �� *Email+5s      �� 5t      $��1��6   $��1��6&   $
��Left=�66   
�������$	��Top=�5v       
 Change#���  5w      #���  64   ��5x      �� *SaveEmailChanges+5y      5z      5{      5|      