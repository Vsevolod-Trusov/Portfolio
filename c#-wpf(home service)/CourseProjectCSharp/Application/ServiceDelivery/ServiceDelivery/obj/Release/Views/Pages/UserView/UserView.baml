   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullI)clr-namespace:ServiceDelivery.Views.PagesServiceDelivery.Views.Pages  G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  3    -ServiceDelivery.Views.Pages.UserView.UserView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     ;local)clr-namespace:ServiceDelivery.Views.Pages     >	viewModel(clr-namespace:ServiceDelivery.ViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  UserView�� � DataContext .   (ServiceDelivery.ViewModels.UserViewModel   � 	Resources    OpenMenu �� TargetProperty �� 
TargetName9  3System.Windows.Media.Animation.EasingDoubleKeyFrame O� KeyTime O� Value  	CloseMenu��%�   &	        &	 s     �� .��U� $ (FrameworkElement.Width)�$ GridMenu��.\�  $ 0��$ 70Q�  $ 	0:0:0:0.1��$	 200Q��� .��U� $ (FrameworkElement.Width)�$ GridMenu��.\�  $ 0��$	 200Q�  $ 	0:0:0:0.1��$ 70Q�.��� .+�� $��1��$��0��
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
��������� -   #���  .����   DoOrder#���  $��Center=�$��Center=�
�������$��16(��� $
 
Horizontal=�.+��� -   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ Comment=�$��30��$��30��
��������� -	   #���  .����   DoReview#���  $��Center=�$��Center=�
�������$��16(��� $
 
Horizontal=�.+��� -
   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ AlphabetOBoxOutline=�$��30��$��30��
��������� -   #���  .����   
YourOrders#���  $��Center=�$��Center=�
�������$��16(��� $
 
Horizontal=�.+��� -   #���  $
��Left=�$	��Top=�$��70��$��50��.��  $ Settings=�$��30��$��30��
��������� -   #���  .����   Settings#���  $��Center=�$��Center=�
�������$��16(� � -   $��
MainFrames��$��0��$��1��$��2��
������   � NavigationUIVisibility$ Hidden=�$��Visible=���. ���� *Page+