   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null=#clr-namespace:ServiceDelivery.ViewsServiceDelivery.Views  G(clr-namespace:ServiceDelivery.ComponentsServiceDelivery.Components  G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  ,    &ServiceDelivery.Views.RegistrationView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5local#clr-namespace:ServiceDelivery.Views     ?
components(clr-namespace:ServiceDelivery.Components     >	viewModel(clr-namespace:ServiceDelivery.ViewModels       � Title$  HelloClient Registration��$	��500��$	��380�� � WindowStyle$
 None=� � Icon$ /Images/Logo/appIcon.ico�� � 
ResizeMode$ NoResize=� � WindowStartupLocation$ CenterScreen=� � DataContext 6   0ServiceDelivery.ViewModels.RegistrationViewModel  .���  � RowDefinitions �� $��30 ��� $��* �.+�� -   $��0��$��0��   BackgroundStep0#���    � ColumnDefinitions �� $��* ��� $��* �.+�]� $��0��$��0��.+��� $��HelloClient Registration��
�������$
��Left=� �� Padding$ 10,5,0,0q�$��13(��� $��0��$��1��	 �� Orientation$	 
Horizontal=�$��Right=�$��5q�.+��� -   $��lineImg��$��Bottom=����� 
 �� 
TargetType"
 ��.���  �� Property � �� �� Value$ /Images/ToolBar/minWh.png�� �� Triggers ��  �� Binding ��  �� Path$ IsMouseOver� �� ElementName$ lineImg�� �� Value True.a���  � ��$ /Images/ToolBar/minGr.png���� -   $��CrossImg��$��2,0,0,0q����� "
 ��.���  � ��$! /Images/ToolBar/closeWh.png�� ��  �� $ IsMouseOver�$ CrossImg�� True.a���  � ��$! /Images/ToolBar/closeGr.png��� $��1��$��0�� �� $��* ��� $��* �����  �� 
StartPoint$	 0,1&� �� EndPoint$	 0,0&�.���   LinearGradientStep0 � Color# �   � Offset$	 1.0Q��   LinearGradientStep1# �  $	 0.5Q��   LinearGradientStep2# �  $	 0.0Q� �� $
��1.5* ��� $��7* ��� $
��1.5* ��� $
��1.5* �.+�� -   $��0��$��0��$��2��$��2��.+��� $��0��$��2��  Registration#���  $��Center=�$ 50,0,0,0q�$��40(�
�������� $��1��$��0��$��2��$
��Left=�$��35,0,0,0q� �� $��2* ��� $��3* ��� $��3* ��� $��3* ��� $��3* ��� $��3* � �� $	��10* ��� $	��10* �.+��� $��0��$��1��$��2��  TextBlockErrorStyle#���  ���� *ErrorMessage+ �� Mode$ TwoWay=��� $��1��$��0�� 	 Login#���    	TextColor#���  �� $��1��$��1��  TextBoxStyle#���  ���� *Login+.���� $��2��$��0�� 	 Password#��� 	 #���  .   (ServiceDelivery.Components.MyPasswordBox  $��2��$��1��   Password �� *
Password+�� $��3��$��0�� 
 ConfPassword#��� 
 #���  $��Stretch=�  $��3��$��1�� �� *ConfirmPassword+�� $��4��$��0�� 	 email#���  #���  �� $��4��$��1��#���  ���� *Email+.���� $��5��$��0��  Stat#���  $	��Top=�$��Right=�$��0,2,0,0q�#���  �� -   $��roleList��$��5��$��1��  ComboBoxStyle#���  
���   �$��25��$��25��$��10 5 2 5q� �� SelectedItem �� *Role+���� *Roles+� $��2��$��0��$��2�� �� $��3* ��� $	��10* �.+��� -   $��LoginBtn��$��0��$��2��  Reg#���    ButtonStyle#���  ���� *TransferLoginPassword+� $��3��$��0��$��2��.+��� -    
 IsAuto#���  $��Center=�$	��Top=�$ 0,5,0,0q����� "
 ��.���  � ��
 �������  � ��$ 	UnderLine{� P�  P� Property �@J�IsMouseOver P� Value . . ���  � ��  TextOver# �  ��  � ��$ 	UnderLine{�