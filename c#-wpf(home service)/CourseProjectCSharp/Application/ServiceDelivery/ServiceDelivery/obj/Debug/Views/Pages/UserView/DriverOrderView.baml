   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5      e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5      :    4ServiceDelivery.Views.Pages.UserView.DriverOrderView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     5      M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5        N� Title$  DriverOrderView��5       � DataContext 5      D   >ServiceDelivery.ViewModels.UserViewModels.DriverOrderViewModel  5   
   .��5      � $��Center=�6    � RowDefinitions 5   
   �� 5      $
��1.5* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $
��0.5* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��5* �6   .+�5   
   �� $��0��6   $��0��6!      CarClass#���   5       
�������$��14(�5!   '   $��Center=�5"      $
��Left=�5#      $��0 0 20 0q�5$      � 5&   
   $��0��6   $��1��6    5'      �� 5(      $��* �6    �� 5)      $��* �6    .+�5,      � $��0��6    � Orientation$ 
Horizontal=�6%   $��Center=�6>   .+�5-      �� $��50��5.      $	��200��5/      $��30��50      $��30��51      $��10 5 2 5q�52      $
��Left=�53        ForegroundBase#���  54        FieldTextColor#���  57      
���   ���55      �� *	Classes+ �� SelectedValue 56      �� *SelectedClass+58      �� 59       	 Class#���  5:      
�������$��12(�5;   (   $��10 0 0 0q�5<      $��Center=�5=      5>      � 5@      $��1��6   $ 
Horizontal=�5A      $��Center=�5B      .+�5C      �� $��50��5D      $	��200��5E      $
��Left=�5F      #���  5G       �� 
IsEditable .  #���  5K      
���   �$��40��5M      $��40��5N      $��10 5 2 5q�5O      ��5H      �� *
CarsModels+ �� SelectedItem 5I      �� *SelectedCar+��5P      �� 5Q      .R�5R      � $ 
Horizontal=�6(   .+�5S   "   �� $��30��6C   $��40��6O   ��6(   �� *	ImgPath+6O   �� 5T   "    �� Padding$ 5 0 0 0 q�6B   $��Center=�6U   ��6,   �� *Text+6U   5U      5V      5Y      �� 5[        CarModel#���  5\      
�������$��12(�5]   (   $��Center=�5^      $��10 0 0 0q�5_      5`      5a      �� 5c   
   $��1��6   $��0��6!     DateSub#���  5d      
�������$��14(�5e   '   $��Center=�5f      $
��Left=�5g      $��0 0 20 0q�5h      (  "System.Windows.Controls.DatePicker  5m   
   -   5        $��Picker��5m   2   $��1��6   $��1��6"   $��Center=�5n      $
��Left=�5o      $	��250��5p      $	��250��5q      $��14(�5r      #���  5t        	IconColor#���  5u      	   SelectedDate	 5s      �� *DateSubmission+
 � 	Resources
 5w      :  4System.Windows.Controls.Primitives.DatePickerTextBox �� 
TargetType �� Property �� Value �� 
IsReadOnly��%�   '        �� 5x      "  6   .�5y      ��  � �� 5z      �� 5{      .R�5|   "   ��  . #���  6>   5}      5      5�      5�      5�      �� 5�   
   $��2��6   $��0��6!     TimeSub#���  5�      
�������$��14(�5�   '   $��Center=�5�      $
��Left=�5�      $��0 0 20 0q�5�      )  #MaterialDesignThemes.Wpf.TimePicker  5�   
   $��2��6$   $��1��61   $	��100��6A   $��30��6M      	Is24Hours .    SelectedTimeFormat$
 Long=�5�   $   $
��Left=�5�   $   #���  5�   #   #���  5�   $      Text 5�   $   �� *Time+�� 5�   
   $��3��6   $��0��6!     	AdressSub#���  5�      
�������$��14(�5�   '   $��Center=�5�      $
��Left=�5�      $��0 0 20 0q�5�      � 5�   
   $��3��6   $��1��6!   $ 
Horizontal=�5�      $
��Left=�5�      $��Center=�5�      .+�5�      �� #���  5�      $	��250��5�      $	��250��5�      ��5�      �� *SubmissionAdress+5�      �� 5�      $��2��6   $��0��6%    
	 Format#��� 	 5�      $��10 0 0 0q�5�      
�������$��12(�5�   +   5�      �� 5�   
   $��4��6   $��0��6!    
 	FullPrice#��� 
 5�      $
��Left=�5�      $��Center=�5�      
�������$��14(�5�   '   $��0 0 20 0q�5�      �� 5�   
   $��4��6   $��1��6!   $
��Left=�5�      $��Center=�5�      
�������$��14(�5�   '   $��0 0 20 0q�5�      ��5�      �� *Price+5�      �� 5�   
   $��5��6   $��1��6   $
��Left=�5�      $��0 0 0 10q�5�      $	��Top=�5�        OrderBtn#���  5�      $��	20 5 20 5q�5�      ��5�      ��  �� Path$ DataContext.SendOrder� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�5�      5�      5�      