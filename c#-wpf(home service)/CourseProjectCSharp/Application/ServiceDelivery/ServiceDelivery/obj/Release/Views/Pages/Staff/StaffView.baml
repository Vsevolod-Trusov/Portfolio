   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullU/clr-namespace:ServiceDelivery.Views.Pages.Staff!ServiceDelivery.Views.Pages.Staff  G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  1    +ServiceDelivery.Views.Pages.Staff.StaffView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Alocal/clr-namespace:ServiceDelivery.Views.Pages.Staff     >	viewModel(clr-namespace:ServiceDelivery.ViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  	StaffView�� � DataContext /   )ServiceDelivery.ViewModels.StaffViewModel   � 	Resources    	CloseMenu �� TargetProperty �� 
TargetName9  3System.Windows.Media.Animation.EasingDoubleKeyFrame O� KeyTime O� Value  OpenMenu��%�   &	        &	 s     �� .��U� $ (FrameworkElement.Width)�$ GridMenu��.\�  $ 0��$	 200Q�  $ 	0:0:0:0.1��$ 70Q��� .��U� $ (FrameworkElement.Width)�$ GridMenu��.\�  $ 0��$ 70Q�  $ 	0:0:0:0.1��$	 200Q�.��� .+�� $��1��$��0��
������  � RowDefinitions �� $��* � � ColumnDefinitions �� $	��200 ��� $��9* ��� $��* �.+�� $��2��.+��� -   	 ��Name$	 GridMenu��$
��Left=�$	��200��
������ .+��� 
 �� Orientation$
 
Horizontal=�.+��� -     BtnMenu#���  $
��Left=�$	��Top=�$��70��$��50��.��'  !MaterialDesignThemes.Wpf.PackIcon     Kind$
 Menu=�$��30��$��30��
��������� -   #���  .����   Menu#���  $��Center=�$��Center=�
�������$��16(��� $��2��
��������� $
 
Horizontal=�.+��� -   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ ProfessionalHexagon=�$��30��$��30��
��������� -   #���  .����   Profile#���  $��Center=�$��Center=�
�������$��16(��� $
 
Horizontal=�.+��� -   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ Paper=�$��30��$��30��
��������� -   #���  .����   	AllOrders#���  $��Center=�$��Center=�
�������$��16(��� $
 
Horizontal=�.+��� -   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ Comment=�$��30��$��30��
��������� -	   #���  .����   YourReviews#���  $��Center=�$��Center=�
�������$��16(��� $
 
Horizontal=�.+��� -
   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ Settings=�$��30��$��30��
��������� -   #���  .����   Settings#���  $��Center=�$��Center=�
�������$��16(� � -   $��
MainFrames��$��0��$��1��$��2��
������   � NavigationUIVisibility$ Hidden=�$��Visible=���. ���� *Page+