   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  :    4ServiceDelivery.Views.Pages.UserView.UserProfileView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  UserProfileView�� � DataContext D   >ServiceDelivery.ViewModels.UserViewModels.UserProfileViewModel  .��� $��Center=� � RowDefinitions �� $
��Auto ��� $��* � � ColumnDefinitions �� $
��Auto ��� $
��0.5* ��� $��* �.+��� $��0��$��0��$	��Top=�
�������$��1q�$
��Left=�$	��180��$	��180��$	��360��$	��360��._��� -   $��BorderImage��$��Center=�$	��180��$	��180��$	��360��$	��360��.+��� -   $��
ImageTitle��   DownloadImg#���   
�������$��16(�$��Stretch=�$��Stretch=�$��Center=�$��Center=�$	��180��$	��180��$	��360��$	��360���� -   $��DownloadImage������ *	ImagePath+� $��1�� �� $
��0.2* ��� $��* � �� $��* ��� $��* �.+��� $��0��$��0��  BtnMenu#���  $	��Top=�  	SelectImg#���  
�������$��14(����� *	SelectImg+�� $��1��$��0��#���  $	��Top=�  Save#���  
�������$��14(����� *SaveSelectedImage+� $��1��$��0��$��2�� �� $
��0.4* ��� $��2* � �� $
��Auto ��� $��* �.+��� $��14(�
�������$��0��$��0��  
EmailTitle#���  $��Center=�$��Center=��� $��14(�$��0��$��1��  FieldTextColor#���  $��Center=� �� 
IsReadOnly . ���� *CurrentEmail+�� $��1��$��0��$
��Left=�$	��150��$	��150��$	��Top=�#���  ���� *Email+�� $��1��$��1��$
��Left=�
�������$	��Top=� 
 Change#���  #���  ���� *SaveEmailChanges+