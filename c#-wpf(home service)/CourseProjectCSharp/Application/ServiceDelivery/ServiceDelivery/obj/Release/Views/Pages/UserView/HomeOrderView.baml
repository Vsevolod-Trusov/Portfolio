   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  8    2ServiceDelivery.Views.Pages.UserView.HomeOrderView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  HomeOrderView�� � DataContext B   <ServiceDelivery.ViewModels.UserViewModels.HomeOrderViewModel  .��� $��Center=� � RowDefinitions �� $��* ��� $��* ��� $��* ��� $��* ��� $
��0.5* ��� $��* � � ColumnDefinitions �� $��* ��� $��5* �.+��� $��0��$��0��   DeadlineTitle#���   
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�(  "System.Windows.Controls.DatePicker  -   $��Picker��$��0��$��1��$��Center=�$
��Left=�$	��250��$	��250��$��14(�  FieldTextColor#���    	IconColor#���     SelectedDate �� *
Deadline+ � 	Resources :  4System.Windows.Controls.Primitives.DatePickerTextBox �� 
TargetType �� Property �� Value��%�   '        �� "  .���  �@��
IsReadOnly . ��  � �� �� .R��� .������ " ��.���  �@��
IsReadOnly . .���� $��1��$��0��  	TimeTitle#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�)  #MaterialDesignThemes.Wpf.TimePicker  $��1��$��1��$	��100��$��30��	   	Is24Hours	 . 
   SelectedTimeFormat$

 Long=�$
��Left=�#���  #���     Text �� *Time+�� $��2��$��0��  DescribeTask#���  
�������$��14(�$	��Top=�$
��Left=�$��0 0 20 0q��� $��2��$��1��$	��350��$	��350�� �� TextWrapping$
 Wrap=�$	��128��$
��Left=�$
��Auto=���. #���    ForegroundBase#���  $��1q����� *Description+�� $��3��$��0��  AdressTitle#���  
�������$��14(�$
��Left=�$��Center=�� $��3��$��1�� � Orientation$ 
Horizontal=�$
��Left=�$��Center=�.+��� $	��250��$	��250��#���  ���� *SubmissionAdress+�� $��2��$��0�� 
 Format#���  
�������$��12(�$��10 0 0 0q��� $��4��$��0��  	FullPrice#���  $
��Left=�$��Center=�
�������$��14(�$��0 0 20 0q��� $��4��$��1��$
��Left=�$��Center=�
�������$��14(�$��0 0 20 0q����� *Price+�� $��5��$��1��$
��Left=�$��0 0 0 10q�$	��Top=�$��Order��$��	20 5 20 5q�����  �� Path$ DataContext.SendOrder� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�