   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null[2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5      e7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5      5    /ServiceDelivery.Views.Pages.UserView.ReviewView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     5      M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     5        N� Title$  
ReviewView��5
       � DataContext 5   
   ?   9ServiceDelivery.ViewModels.UserViewModels.ReviewViewModel  5   
   .��5      � $��Center=�6    � RowDefinitions 5      �� 5      $��* �6   �� 5      $��* �6   �� 5      $��* �6   �� 5      $��3* �6   �� 5      $��* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��* �6   .+�5   
   �� $��0��6   $��0��6!   $��	Addressee��5       
�������$��14(�5!   '   $��Center=�5"      $
��Left=�5#      $��0 0 20 0q�5$      �� 5&   
   $��0��6   $��1��6!   $��50��5'      $	��200��5(      $
��Left=�5)      $��Center=�5*      $��Center=�5+         ForegroundBase#���   5.       �� 
IsEditable .  
���   �  FieldTextColor#���  51      ��5,      �� *
Profiles+ �� SelectedItem 5-      �� *SelectedProfile+��53      �� 54      .R�55      �  � Orientation$ 
Horizontal=�6    .+�56      �� $��30��6:   $��30��6F   ��6    �� *Avatar+6F   �� 57       �� Padding$ 5 0 0 0 q�6;   $��Center=�6N   ��6$   �� *Login+6N   58      59      5<      �� 5>   
   $��1��6   $��0��6!   $��Review��5?      
�������$��14(�5@   '   $	��Top=�5A      $
��Left=�5B      $��0 0 20 0q�5C      �� 5D      $��1��6   $��1��6#   #���   5F      $��1q�5G      #���  5H      $	��300��5I      $	��300��5J      $
��Left=�5K       �� TextWrapping$
 Wrap=�5L      $	��110��5M      $
��Auto=�5N      ��. ��5E      �� *ReviewMessage+5O      �� 5R   
   $��2��6   $��0��6!   $��
Estimation��5S      
�������$��14(�5T   '   $��Center=�5U      $
��Left=�5V      $��0 0 20 0q�5W      �� 5X   
   $��2��6   $��1��6    $��80��5[      $��80��5\      $��30��5]      $��30��5^      $
��Left=�5_      #���   5`      #���  5a      
���   �$��Center=�5c      ��5Y      �� *Estimations+ 5Z      �� *
Estimation+5c      �� 5g   
   $��3��6   $��0��6!   $��Image��5h      
�������$��14(�5i   '   $	��Top=�5j      $
��Left=�5k      $��0 0 20 0q�5l      �� 5n   
   $��3��6   $��1��6   
�������$��1q�5p      $	��170��5q      $	��200��5r      $	��300��5s      $	��420��5t      ._�5v      �� -   5        $��BorderImage��5w      $��Center=�5x      $	��170��5y      $	��200��5z      $	��300��5{      $	��420��5|      .+�5~      �� -   5        $��
ImageTitle��5�      $��Download Image��5      
�������$��16(�5�      $��Stretch=�5�      $��Stretch=�5�      $��Center=�5�      $��Center=�5�      $	��200��5�      $	��200��5�      $	��400��5�      $	��300��5�      $	��420��5�      �� 5�      -   5        $��DownloadImage��5�      ��5�      �� 	 �� Path$	 ReviewImagePath�5�      5�      �� 5�   
   $��1��6   $��4��6!     BtnMenu#���  5�      $��Select Image��5�      
�������$��14(�5�      ��5�      �� *ChooseImage+5�      �� 5�   	   $��1��6   $��5��6    $��	Do review��5�      $
��Left=�5�      $��	20 0 20 0q�5�      $��14(�5�      ��5�      �� *
SendReview+5�      5�      5�      