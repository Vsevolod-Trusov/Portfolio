   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  7    1ServiceDelivery.Views.Pages.UserView.DeliveryView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  DeliveryView�� � DataContext A   ;ServiceDelivery.ViewModels.UserViewModels.DeliveryViewModel  .��� $��Center=� � RowDefinitions �� $��* ��� $��* ��� $��* ��� $��* ��� $��* ��� $
��0.5* ��� $��* � � ColumnDefinitions �� $
��1.5* ��� $��5* �.+��� $��0��$��0��   
AdressFrom#���   
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�� $��0��$��1�� � Orientation$ 
Horizontal=�$
��Left=�$��Center=�.+���   FieldTextColor#���  $	��250��$	��250������ *
AdressFrom+�� $��2��$��0��$��10 0 0 0q� 
 Format#���  
�������$��12(��� $��1��$��0��  DescribeItem#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q��� $��1��$��1��#���    ForegroundBase#���  $��1q� �� TextWrapping$
 Wrap=�$	��128��$	��350��$	��350��$
��Left=�$
��Auto=���. ���� *Object+�� $��2��$��0��  AdressTo#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�� $��2��$��1��$ 
Horizontal=�$
��Left=�$��Center=�.+��� #���  $	��250��$	��250������ *
AdressTo+�� $��2��$��0��#���  
�������$��12(�$��10 0 0 0q��� $��3��$��0��  DateSub#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�(  "System.Windows.Controls.DatePicker  -   $��Picker��$��3��$��1��$��Center=�$
��Left=�$	��250��$	��250��$��14(�#���    	IconColor#���     SelectedDate �� *
Deadline+ � 	Resources :  4System.Windows.Controls.Primitives.DatePickerTextBox �� 
TargetType	 �� Property
 �� Value��%�   '        �� "  .��� 	 �@��
IsReadOnly
 . �� 	 � ��
 �� .R��� .������ " ��.��� 	 �@��
IsReadOnly
 . .���� $��4��$��0��  	TimeTitle#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�)  #MaterialDesignThemes.Wpf.TimePicker  $��4��$��1��$	��100��$��30��   	Is24Hours .    SelectedTimeFormat$
 Long=�$
��Left=�#���  #���     Text �� *Time+�� $��5��$��0�� 	 	FullPrice#��� 	 $
��Left=�$��Center=�
�������$��14(�$��0 0 20 0q��� $��5��$��1��$
��Left=�$��Center=�
�������$��14(�$��0 0 20 0q����� *Price+�� $��6��$��1��$
��Left=�$��0 0 0 10q�$	��Top=�$��Order��$��	20 5 20 5q�����  �� Path$ DataContext.SendOrder� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�