   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null=#clr-namespace:ServiceDelivery.ViewsServiceDelivery.Views  5      G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  5      ,    &ServiceDelivery.Views.StaffProfileView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      5local#clr-namespace:ServiceDelivery.Views     5      >	viewModel(clr-namespace:ServiceDelivery.ViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5        N� Title$  StaffProfileView��5       � DataContext 5      5   /ServiceDelivery.ViewModels.ProfilePageViewModel  5   
   .��5      � $��Center=�6    � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $
��0.5* �6   �� 5      $��* �6   .+�5   
   �� $��0��6   $��0��6   $	��Top=�5      
�������$��1q�5       $
��Left=�5!      $	��180��5"      $	��180��5#      $	��360��5$      $	��360��5%      ._�5'      �� -   5        $��BorderImage��5(      $��Center=�5)      $	��180��5*      $	��180��5+      $	��360��5,      $	��360��5-      .+�5/      �� -   5        $��
ImageTitle��51         DownloadImg#���   50      
�������$��16(�53      $��Stretch=�54      $��Stretch=�55      $��Center=�56      $��Center=�57      $	��180��58      $	��180��59      $	��360��5:      $	��360��5;      �� 5=      -   5        $��DownloadImage��5=      ��5>      �� *	ImagePath+5@      5A      � 5B   
   $��1��6    5C      �� 5D      $
��0.2* �6    �� 5E      $��* �6     5G      �� 5H      $��* �6#   �� 5I      $��* �6#   .+�5L      �� $��0��6   $��0��6%     BtnMenu#���  5M        	SelectImg#���  5O      $	��Top=�5P      
�������$��14(�5R      ��5N      �� *	SelectImg+5R      �� 5S      $��1��6   $��0��6%   #���  5T      $	��Top=�5V        Save#���  5W      
�������$��14(�5Y      ��5U      �� *SaveSelectedImage+5Y      � 5[      $��1��6   $��0��6    $��2��60    5\      �� 5]      $
��Auto �6$   �� 5^      $��* �6$    5`      �� 5a      $��* �6'   �� 5b      $��* �6'   .+�5d      �� -   5        $��ServiceTypesComboBox��5f      $��0��5d      $��0��6(   $��Center=�68   $	��100��6U     ForegroundBase#���  5i        FieldTextColor#���  5j      $��25��5k      $��25��5l      $��10 5 2 5q�5m      {�5e      �� *	IsEnabled+��5g      �� *ServiceTypes+ �� SelectedValue 5h      �� *SelectedServiceType+5m      �� 5n      $��0��6   $��1��6&   
������� 
 Change#���  5p      #���  64   ��5q      �� *SaveStaffChanges+� 5s      $��1��6   $��0��6$   $��2��64    5t      �� 5u      $��* �6(   �� 5v      $��2* �6(    5x      �� 5y      $��* �6+   �� 5z      $��* �6+   .+�5|      �� $��14(�6    
�������$��0��6A   $��0��6N     
EmailTitle#���  5}      $��Center=�5~       $��Center=�5       �� 5�      $��14(�6   #���  6,   $��0��6Z   $��1��6g   $��Center=�5�       �� 
IsReadOnly . ��5�      �� *CurrentEmail+5�      �� 5�      $��1��6   $��0��6+   #���  5�      $
��Left=�5�      $	��150��5�      $	��150��5�      $	��Top=�5�      ��5�      �� *Email+5�      �� 5�      $��1��6   $��1��6*   $
��Left=�6:   
�������$	��Top=�5�      #���  5�      #���  64   ��5�      �� *SaveEmailChanges+5�      5�      5�      5�      5�      