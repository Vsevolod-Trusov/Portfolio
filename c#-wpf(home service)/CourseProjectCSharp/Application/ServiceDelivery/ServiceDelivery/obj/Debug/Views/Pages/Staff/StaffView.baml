   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullU/clr-namespace:ServiceDelivery.Views.Pages.Staff!ServiceDelivery.Views.Pages.Staff  5      G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  5      1    +ServiceDelivery.Views.Pages.Staff.StaffView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Alocal/clr-namespace:ServiceDelivery.Views.Pages.Staff     5      >	viewModel(clr-namespace:ServiceDelivery.ViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  6C     N� Title$  	StaffView��5
       � DataContext 5      /   )ServiceDelivery.ViewModels.StaffViewModel  5   
    � 	Resources 5         	CloseMenu �� TargetProperty �� 
TargetName9  3System.Windows.Media.Animation.EasingDoubleKeyFrame O� KeyTime O� Value  OpenMenu��%�  &	        &	 �     �� 5   
   .��5      U� $ (FrameworkElement.Width)�6,   $ GridMenu��6a   .\�5        $ 0��6'   $	 200Q�63     5      $ 	0:0:0:0.1��6'   $ 70Q�6;   5      5      �� 5   
   .��5      U� $ (FrameworkElement.Width)�6,   $ GridMenu��6a   .\�5        $ 0��6'   $ 70Q�63     5      $ 	0:0:0:0.1��6'   $	 200Q�6;   5      5      5      .��5      � .+�5%   
   � $��1��6   $��0��6   
������  � RowDefinitions 5&      �� 5'      $��* �6     � ColumnDefinitions 5)      �� 5*      $	��200 �6#   �� 5+      $��9* �6#   �� 5,      $��* �6#   .+�52      � $��2��6   .+�53      �� -   5        	 ��Name$	 GridMenu��53      $
��Left=�54   !   $	��200��55   !   
������ .+�58      �� 
 �� Orientation$
 
Horizontal=�6!   .+�59      �� -   5          BtnMenu#���  59   $   $
��Left=�5:   %   $	��Top=�5;   %   $��70��5<   %   $��50��5=   %   .��5?      '  !MaterialDesignThemes.Wpf.PackIcon     Kind$
 Menu=�66   $��30��6B   $��30��6M   
�������6Y   5@      �� 5A      -   5        #���  5A   !   .��5C      ��   Menu#���  6(   $��Center=�6G   $��Center=�5D   ,   
�������$��16(�5F   ,   5H      5I      �� 5J      $��2��6    
�������6+   �� 5K      $
 
Horizontal=�6!   .+�5L      �� -   5        #���  5L   $   $
��Left=�5M   %   $	��Top=�5N   %   $��70��5O   %   $��50��5P   %   .��5R        $ ProfessionalHexagon=�66   $��30��6Q   $��30��6\   
�������6h   5S      �� 5T      -   5        #���  5T   !   .��5V      ��   Profile#���  6(   $��Center=�6J   $��Center=�5W   ,   
�������$��16(�5Y   ,   5[      5\      �� 5]      $
 
Horizontal=�6!   .+�5^      �� -   5        #���  5^   $   $
��Left=�5_   %   $	��Top=�5`   %   $��70��5a   %   $��50��5b   %   .��5d        $ Paper=�66   $��30��6C   $��30��6N   
�������6Z   5e      �� 5f      -   5        #���  5f   !   .��5h      ��   	AllOrders#���  6(   $��Center=�6L   $��Center=�5i   ,   
�������$��16(�5k   ,   5m      5n      �� 5o      $
 
Horizontal=�6!   .+�5p      �� -   5        #���  5p   $   $
��Left=�5q   %   $	��Top=�5r   %   $��70��5s   %   $��50��5t   %   .��5v        $ Comment=�66   $��30��6F   $��30��6Q   
�������6]   5w      �� 5x      -	   5        #���  5x   !   .��5z      ��   YourReviews#���  6(   $��Center=�6N   $��Center=�5{   ,   
�������$��16(�5}   ,   5~      5�      �� 5�      $
 
Horizontal=�6!   .+�5�      �� -
   5        #���  5�   $   $
��Left=�5�   %   $	��Top=�5�   %   $��70��5�   %   $��50��5�   %   .��5�        $ Settings=�66   $��30��6F   $��30��6Q   
�������6]   5�      �� 5�      -   5        #���  5�   !   .��5�      ��   Settings#���  6(   $��Center=�6K   $��Center=�5�   ,   
�������$��16(�5�   ,   5�      5�      5�      5�       � 5�      -   5        $��
MainFrames��5�      $��0��5�      $��1��6"   $��2��62   
������   � NavigationUIVisibility$ Hidden=�5�      $��Visible=�5�      ��. ��5�      �� *Page+5�      5�      5�      5�      