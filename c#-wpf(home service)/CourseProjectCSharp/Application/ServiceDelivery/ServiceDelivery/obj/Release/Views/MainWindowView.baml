   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null=#clr-namespace:ServiceDelivery.ViewsServiceDelivery.Views  G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  *    $ServiceDelivery.Views.MainWindowView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5local#clr-namespace:ServiceDelivery.Views     >	viewModel(clr-namespace:ServiceDelivery.ViewModels       � Icon$  /Images/Logo/appIcon.ico�� � Title$ MainWindowView�� � WindowStyle$
 None=� � WindowStartupLocation$ CenterScreen=�$	��800��$	��620��$	��640��$
��1120��'  !System.Windows.Shell.WindowChrome   WindowChrome      CaptionHeight$ 0Q� � 	Resources  �� 
TargetType �� Triggers	 P� Property
 P� Value �� Property �� Value-  'System.Windows.Media.Effects.BlurEffect   Radius��%`   'm�       �� " m� P� 	 �@J�IsMouseOver
 . . ���  �@J�Effect   $ 2Q�.���  � RowDefinitions �� $��50 ��� $��* �.+�� -   $��0��$��0��   BackgroundStep0#���    � ColumnDefinitions �� $��* ��� $
��1.5* �.+�� $��0�� � Orientation$ 
Horizontal=�$
��Left=�$��Center=�$	��270��.+�o� 
�������$��Center=�$��Center=�.@�m� $��HelloClient��#���   .@�m�   	LogOutBtn#���   m� Command �� *OpenAthorizationView+�� $��0��$��1�� �� Orientation$ 
Horizontal=�$��Right=�$��5 5 0 5q�$	��325��$��30��.+��� $ 
Horizontal=�$��0,0,10,0q�$	��200��.+��� $��3��$��1��
�������$��1q� �� Padding$ 1q�
�������$��30��$��30��._��� $��Center=�$��Center=����� *	ImagePath+�� $��Center=� �� Padding$ 	10,0,10,0q�  ToolBarTextColor#���  ���� *Login+� $ 
Horizontal=�$��Center=�.+���   Role#���  #���  $��Center=�$ 0 0 5 0q��� #���  $��0,0,20,0q�$��Center=����� *Role+�� $ 
Horizontal=�$��Center=�.+��� -   $��lineImg��$��5q�$��Bottom=����� " ��.���  � ��$ /Images/ToolBar/minWh.png�� ��  �� Binding ��  �� Path$ IsMouseOver� �� ElementName$ lineImg�� �� Value True.a���  � ��$ /Images/ToolBar/minGr.png���� -   $��WinImg��$��5q����� " ��.���  � ��$# /Images/ToolBar/restoreWh.png���� -   $��CrossImg��$��5q����� " ��.���  � ��$! /Images/ToolBar/closeWh.png�� ��  �� $ IsMouseOver�$ CrossImg�� True.a���  � ��$! /Images/ToolBar/closeGr.png��� $��1��$��0�� �� $	��11* ��� $��3* �����  �� 
StartPoint$	 0,1&� �� EndPoint$	 0,0&�.���   LinearGradientStep0 � Color# �   � Offset$	 1.0Q��   LinearGradientStep1# �  $	 0.5Q��   LinearGradientStep2# �  $	 0.0Q�.+� � -   $��	MainFrame��
������   � NavigationUIVisibility$ Hidden=�$��2������ *
RolePage+