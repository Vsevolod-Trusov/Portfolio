   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5      e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5      7    1ServiceDelivery.Views.Pages.UserView.DeliveryView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     5      M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  6Q     N� Title$  DeliveryView��5
       � DataContext 5      A   ;ServiceDelivery.ViewModels.UserViewModels.DeliveryViewModel  5   
   .��5      � $��Center=�6    � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $
��0.5* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $
��1.5* �6   �� 5      $��5* �6   .+�5   
   �� $��0��6   $��0��6!      
AdressFrom#���   5       
�������$��14(�5!   '   $��Center=�5"      $
��Left=�5#      $��0 0 20 0q�5$      � 5&   
   $��0��6   $��1��6!    � Orientation$ 
Horizontal=�5'      $
��Left=�5(      $��Center=�5)      .+�5+      ��   FieldTextColor#���  5-      $	��250��5.      $	��250��5/      ��5,      �� *
AdressFrom+5/      �� 51      $��2��6   $��0��6%   $��10 0 0 0q�52       
 Format#���  53      
�������$��12(�54   '   56      �� 58   
   $��1��6   $��0��6!     DescribeItem#���  59      
�������$��14(�5:   '   $��Center=�5;      $
��Left=�5<      $��0 0 20 0q�5=      �� 5?   
   $��1��6   $��1��6   #���  5A        ForegroundBase#���  5B      $��1q�5C       �� TextWrapping$
 Wrap=�5D      $	��128��5E      $	��350��5F      $	��350��5G      $
��Left=�5H      $
��Auto=�5I      ��. ��5@      �� *Object+5J      �� 5M   
   $��2��6   $��0��6!     AdressTo#���  5N      
�������$��14(�5O   '   $��Center=�5P      $
��Left=�5Q      $��0 0 20 0q�5R      � 5T   
   $��2��6   $��1��6!   $ 
Horizontal=�5U      $
��Left=�5V      $��Center=�5W      .+�5Z      �� #���  5\      $	��250��5]      $	��250��5^      ��5[      �� *
AdressTo+5^      �� 5`      $��2��6   $��0��6%   #���  5a      
�������$��12(�5b   '   $��10 0 0 0q�5c      5e      �� 5g   
   $��3��6   $��0��6!     DateSub#���  5h      
�������$��14(�5i   '   $��Center=�5j      $
��Left=�5k      $��0 0 20 0q�5l      (  "System.Windows.Controls.DatePicker  5o   
   -   5        $��Picker��5o   3   $��3��6   $��1��6"   $��Center=�5p      $
��Left=�5q      $	��250��5r      $	��250��5s      $��14(�5t      #���  5u        	IconColor#���  5w         SelectedDate 5v      �� *
Deadline+ � 	Resources 5y      :  4System.Windows.Controls.Primitives.DatePickerTextBox �� 
TargetType	 �� Property
 �� Value��%*  '        �� 5z      "  6   .�5{      �� 	 �@��
IsReadOnly
 . 63   �� 5|      	 � ��
 5}      �� 5~      .R�5   "   �� .��6+   ��5�   &   �� 5�   *   " ��60   .�5�   .   �� 	 �@��
IsReadOnly
 . 6K   5�   +   .��5�   5   5�   #   5�      5�      5�      5�      5�      �� 5�   
   $��4��6   $��0��6!     	TimeTitle#���  5�      
�������$��14(�5�   '   $��Center=�5�      $
��Left=�5�      $��0 0 20 0q�5�      )  #MaterialDesignThemes.Wpf.TimePicker  5�   
   $��4��6%   $��1��62   $	��100��6B   $��30��6N      	Is24Hours .    SelectedTimeFormat$
 Long=�5�   %   $
��Left=�5�   %   #���  5�   %   #���  5�   %      Text 5�   %   �� *Time+5�   %   �� 5�   
   $��5��6   $��0��6"    	 	FullPrice#��� 	 5�      $
��Left=�5�      $��Center=�5�      
�������$��14(�5�   '   $��0 0 20 0q�5�      �� 5�   
   $��5��6   $��1��6"   $
��Left=�5�      $��Center=�5�      
�������$��14(�5�   '   $��0 0 20 0q�5�      ��5�      �� *Price+5�      �� 5�   
   $��6��6   $��1��6   $
��Left=�5�      $��0 0 0 10q�5�      $	��Top=�5�      $��Order��5�      $��	20 5 20 5q�5�      ��5�      ��  �� Path$ DataContext.SendOrder� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�5�      5�      5�      