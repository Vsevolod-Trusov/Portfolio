   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5    /ServiceDelivery.Views.Pages.UserView.ReviewView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels       N� Title$  
ReviewView�� � DataContext ?   9ServiceDelivery.ViewModels.UserViewModels.ReviewViewModel  .��� $��Center=� � RowDefinitions �� $��* ��� $��* ��� $��* ��� $��3* ��� $��* ��� $��* � � ColumnDefinitions �� $��* ��� $��* �.+��� $��0��$��0��$��	Addressee��
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q��� $��0��$��1��$��50��$	��200��$
��Left=�$��Center=�$��Center=�   ForegroundBase#���    �� 
IsEditable .  
���   �  FieldTextColor#���  ���� *
Profiles+ �� SelectedItem �� *SelectedProfile+���� .R��  � Orientation$ 
Horizontal=�.+��� $��30��$��30������ *Avatar+��  �� Padding$ 5 0 0 0 q�$��Center=����� *Login+�� $��1��$��0��$��Review��
�������$��14(�$	��Top=�$
��Left=�$��0 0 20 0q��� $��1��$��1��#���   $��1q�#���  $	��300��$	��300��$
��Left=� �� TextWrapping$
 Wrap=�$	��110��$
��Auto=���. ���� *ReviewMessage+�� $��2��$��0��$��
Estimation��
�������$��14(�$��Center=�$
��Left=�$��0 0 20 0q��� $��2��$��1��$��80��$��80��$��30��$��30��$
��Left=�#���   #���  
���   �$��Center=����� *Estimations+ �� *
Estimation+�� $��3��$��0��$��Image��
�������$��14(�$	��Top=�$
��Left=�$��0 0 20 0q��� $��3��$��1��
�������$��1q�$	��170��$	��200��$	��300��$	��420��._��� -   $��BorderImage��$��Center=�$	��170��$	��200��$	��300��$	��420��.+��� -   $��
ImageTitle��$��Download Image��
�������$��16(�$��Stretch=�$��Stretch=�$��Center=�$��Center=�$	��200��$	��200��$	��400��$	��300��$	��420���� -   $��DownloadImage������ 	 �� Path$	 ReviewImagePath��� $��1��$��4��  BtnMenu#���  $��Select Image��
�������$��14(����� *ChooseImage+�� $��1��$��5��$��	Do review��$
��Left=�$��	20 0 20 0q�$��14(����� *
SendReview+