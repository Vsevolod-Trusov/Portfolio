   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null=#clr-namespace:ServiceDelivery.ViewsServiceDelivery.Views  G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  ,    &ServiceDelivery.Views.StaffProfileView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     5local#clr-namespace:ServiceDelivery.Views     >	viewModel(clr-namespace:ServiceDelivery.ViewModels     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  StaffProfileView�� � DataContext 5   /ServiceDelivery.ViewModels.ProfilePageViewModel  .��� $��Center=� � RowDefinitions �� $
��Auto ��� $��* � � ColumnDefinitions �� $
��Auto ��� $
��0.5* ��� $��* �.+��� $��0��$��0��$	��Top=�
�������$��1q�$
��Left=�$	��180��$	��180��$	��360��$	��360��._��� -   $��BorderImage��$��Center=�$	��180��$	��180��$	��360��$	��360��.+��� -   $��
ImageTitle��   DownloadImg#���   
�������$��16(�$��Stretch=�$��Stretch=�$��Center=�$��Center=�$	��180��$	��180��$	��360��$	��360���� -   $��DownloadImage������ *	ImagePath+� $��1�� �� $
��0.2* ��� $��* � �� $��* ��� $��* �.+��� $��0��$��0��  BtnMenu#���    	SelectImg#���  $	��Top=�
�������$��14(����� *	SelectImg+�� $��1��$��0��#���  $	��Top=�  Save#���  
�������$��14(����� *SaveSelectedImage+� $��1��$��0��$��2�� �� $
��Auto ��� $��* � �� $��* ��� $��* �.+��� -   $��ServiceTypesComboBox��$��0��$��0��$��Center=�$	��100��  ForegroundBase#���    FieldTextColor#���  $��25��$��25��$��10 5 2 5q�{��� *	IsEnabled+���� *ServiceTypes+ �� SelectedValue �� *SelectedServiceType+�� $��0��$��1��
������� 
 Change#���  #���  ���� *SaveStaffChanges+� $��1��$��0��$��2�� �� $��* ��� $��2* � �� $��* ��� $��* �.+��� $��14(�
�������$��0��$��0��  
EmailTitle#���  $��Center=�$��Center=��� $��14(�#���  $��0��$��1��$��Center=� �� 
IsReadOnly . ���� *CurrentEmail+�� $��1��$��0��#���  $
��Left=�$	��150��$	��150��$	��Top=����� *Email+�� $��1��$��1��$
��Left=�
�������$	��Top=�#���  #���  ���� *SaveEmailChanges+