   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  :    4ServiceDelivery.Views.Pages.UserView.DriverOrderView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  DriverOrderView�� � DataContext D   >ServiceDelivery.ViewModels.UserViewModels.DriverOrderViewModel  .��� $��Center=� � RowDefinitions �� $
��1.5* ��� $��* ��� $��* ��� $��* ��� $
��0.5* ��� $��* � � ColumnDefinitions �� $��* ��� $��5* �.+��� $��0��$��0��   CarClass#���   
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�� $��0��$��1�� �� $��* ��� $��* �.+�� $��0�� � Orientation$ 
Horizontal=�$��Center=�.+��� $��50��$	��200��$��30��$��30��$��10 5 2 5q�$
��Left=�  ForegroundBase#���    FieldTextColor#���  
���   ����� *	Classes+ �� SelectedValue �� *SelectedClass+��  	 Class#���  
�������$��12(�$��10 0 0 0q�$��Center=�� $��1��$ 
Horizontal=�$��Center=�.+��� $��50��$	��200��$
��Left=�#���   �� 
IsEditable .  #���  
���   �$��40��$��40��$��10 5 2 5q����� *
CarsModels+ �� SelectedItem �� *SelectedCar+���� .R�� $ 
Horizontal=�.+��� $��30��$��40������ *	ImgPath+��  �� Padding$ 5 0 0 0 q�$��Center=����� *Text+��   CarModel#���  
�������$��12(�$��Center=�$��10 0 0 0q��� $��1��$��0��  DateSub#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�(  "System.Windows.Controls.DatePicker  -   $��Picker��$��1��$��1��$��Center=�$
��Left=�$	��250��$	��250��$��14(�#���    	IconColor#���  	   SelectedDate	 �� *DateSubmission+
 � 	Resources
 :  4System.Windows.Controls.Primitives.DatePickerTextBox �� 
TargetType �� Property �� Value �� 
IsReadOnly��%C   '        �� "  .���  � �� �� .R���  . #���  �� $��2��$��0��  TimeSub#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�)  #MaterialDesignThemes.Wpf.TimePicker  $��2��$��1��$	��100��$��30��   	Is24Hours .    SelectedTimeFormat$
 Long=�$
��Left=�#���  #���     Text �� *Time+�� $��3��$��0��  	AdressSub#���  
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q�� $��3��$��1��$ 
Horizontal=�$
��Left=�$��Center=�.+��� #���  $	��250��$	��250������ *SubmissionAdress+�� $��2��$��0�� 
	 Format#��� 	 $��10 0 0 0q�
�������$��12(��� $��4��$��0�� 
 	FullPrice#��� 
 $
��Left=�$��Center=�
�������$��14(�$��0 0 20 0q��� $��4��$��1��$
��Left=�$��Center=�
�������$��14(�$��0 0 20 0q����� *Price+�� $��5��$��1��$
��Left=�$��0 0 0 10q�$	��Top=�  OrderBtn#���  $��	20 5 20 5q�����  �� Path$ DataContext.SendOrder� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�