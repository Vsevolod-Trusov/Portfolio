   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5      e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5      8    2ServiceDelivery.Views.Pages.UserView.HomeOrderView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     5      M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  6Q     N� Title$  HomeOrderView��5
       � DataContext 5      B   <ServiceDelivery.ViewModels.UserViewModels.HomeOrderViewModel  5   
   .��5      � $��Center=�6    � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $
��0.5* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��5* �6   .+�5   
   �� $��0��6   $��0��6!      DeadlineTitle#���   5       
�������$��14(�5!   '   $��Center=�5"      $
��Left=�5#      $��0 0 20 0q�5$      (  "System.Windows.Controls.DatePicker  5'   
   -   5        $��Picker��5'   3   $��0��6   $��1��6"   $��Center=�5(      $
��Left=�5)      $	��250��5*      $	��250��5+      $��14(�5,        FieldTextColor#���  5.        	IconColor#���  5/         SelectedDate 5-      �� *
Deadline+ � 	Resources 51      :  4System.Windows.Controls.Primitives.DatePickerTextBox �� 
TargetType �� Property �� Value��%*  '        �� 52      "  6   .�53      ��  �@��
IsReadOnly . 63   �� 54       � �� 55      �� 56      .R�57   "   �� .��6+   ��58   &   �� 59   *   " ��60   .�5:   .   ��  �@��
IsReadOnly . 6K   5;   +   .��5<   5   5=   #   5?      5A      5B      5C      5D      �� 5F   
   $��1��6   $��0��6!     	TimeTitle#���  5G      
�������$��14(�5H   '   $��Center=�5I      $
��Left=�5J      $��0 0 20 0q�5K      )  #MaterialDesignThemes.Wpf.TimePicker  5M   
   $��1��6%   $��1��62   $	��100��6B   $��30��6N   	   	Is24Hours	 . 
   SelectedTimeFormat$

 Long=�5O   %   $
��Left=�5P   %   #���  5Q   %   #���  5S   %      Text 5R   %   �� *Time+5S   %   �� 5U   
   $��2��6   $��0��6!     DescribeTask#���  5V      
�������$��14(�5W   '   $	��Top=�5X      $
��Left=�5Y      $��0 0 20 0q�5Z      �� 5\   
   $��2��6   $��1��6   $	��350��5^      $	��350��5_       �� TextWrapping$
 Wrap=�5`      $	��128��5a      $
��Left=�5b      $
��Auto=�5c      ��. #���  5e        ForegroundBase#���  5f      $��1q�5g      ��5]      �� *Description+5g      �� 5j   
   $��3��6   $��0��6!     AdressTitle#���  5k      
�������$��14(�5l   '   $
��Left=�5m      $��Center=�5n      � 5q   
   $��3��6   $��1��6!    � Orientation$ 
Horizontal=�5r      $
��Left=�5s      $��Center=�5t      .+�5x      �� $	��250��5z      $	��250��5{      #���  5|      ��5y      �� *SubmissionAdress+5|      �� 5}      $��2��6   $��0��6%    
 Format#���  5~      
�������$��12(�5   +   $��10 0 0 0q�5�      5�      �� 5�   
   $��4��6   $��0��6"     	FullPrice#���  5�      $
��Left=�5�      $��Center=�5�      
�������$��14(�5�   '   $��0 0 20 0q�5�      �� 5�   
   $��4��6   $��1��6"   $
��Left=�5�      $��Center=�5�      
�������$��14(�5�   '   $��0 0 20 0q�5�      ��5�      �� *Price+5�      �� 5�   
   $��5��6   $��1��6   $
��Left=�5�      $��0 0 0 10q�5�      $	��Top=�5�      $��Order��5�      $��	20 5 20 5q�5�      ��5�      ��  �� Path$ DataContext.SendOrder� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�5�      5�      5�      