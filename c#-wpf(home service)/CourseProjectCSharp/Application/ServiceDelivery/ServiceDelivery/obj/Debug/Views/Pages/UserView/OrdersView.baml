   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nulle7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  5      [2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5      5    /ServiceDelivery.Views.Pages.UserView.OrdersView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     5      Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5	        N� Title$  
OrdersView��5       � DataContext 5      ?   9ServiceDelivery.ViewModels.UserViewModels.OrdersViewModel  5   
   .��5      �  � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $	��10* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��9* �6   �� 5      $��2* �6   .+�5   
   �� $��0��6      Filters#���   6%   
�������$
��Left=�5      $��Center=�5      $��14(�5      � 5!   
   $��0��6   $��1��6   $��2��6,    5"      �� 5#      $��* �6#   �� 5$      $��* �6#   �� 5%      $��* �6#   .+�5'      �� $��0��6    
 UnProc#���  6%   $
��Auto��5(      $
��Auto��6"   $��5q�5)      
�������  BtnMenu#���  5+      ��5,      ��  �� Path$ DataContext.DoFilter� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N��� 5/      $��1��6     Proc#���  6%   $
��Auto��50      $
��Auto��6"   $��5q�51      
�������#���  53      ��54      �� $# DataContext.DoProcessedFilter� �� $ FindAncestor=�" N��� 59      $��2��6    	 Compl#���  6%   $
��Auto��5:      $
��Auto��6"   $��5q�5;      
�������#���  5=      ��5>      �� $# DataContext.DoCompletedFilter� �� $ FindAncestor=�" N�5B      &   System.Windows.Controls.DataGrid  5D   
   -   5          Name$ dataGrid��5G      $��1��5D      $��0��5E      $��3��5F      	   AutoGenerateColumns	 .  
�������
   
IsReadOnly
 . $��Center=�5L      $��14(�60   $	��Top=�5M         CanUserResizeColumns .     CanUserResizeRows .     CanUserAddRows .     CanUserDeleteRows .  
������ $
��Auto=�5S      $
��Auto=�5T        DataGridHeaderColumnStyle   ColumnHeaderStyle# �  5U      ��5H      �� $ CustomerOrders� �� SelectedItem 5V      �� *SelectedOrder+   Columns 5Y      0  *System.Windows.Controls.DataGridTextColumn  5Z      1  +System.Windows.Controls.DataGridBoundColumn   Binding 6%   �� $ Description�,  &System.Windows.Controls.DataGridColumn   Header 5[      �� 5\        Description#���  6(      	CellStyle 5^      �� 5_       �� 
TargetType*  $System.Windows.Controls.DataGridCell"  6    .�5`      ��  �� Property � �� �� Value 5a   "   �� 5b   &    �� 
TargetType" ��66   .R�5c   *   �� ��6;   ��  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=���5d   .   �� 5e   2   .R�5f   6   ��  �� TextWrapping$
 Wrap=�5g   &   " �� VerticalScrollBarVisibility$
 Auto=�6:   $��Stretch=�5h   &   $	��2,0q�6B   $��0q�6O   $��80��6c   $	��250��5i   >    �� 
IsReadOnly . ��5f   >   �� $
 Text�$ TwoWay=�5j   >   5k   3   5m   +   5n   '   5p      5q      5s        5t       6%   �� $ OrderDateString� 5u      �� 5v        	DataOrder#���  6$   5x        5y       6%   �� $ DeadlineString� 5z      �� 5{        Deadline#���  6$   5}        5~       6%   �� $ Price� 5      �� 5�       		 Price#��� 	 6$   5�        5�       6%   �� $ Executor� 5�      �� 5�       
 Executor#��� 
 6$   5�        5�       6%   �� $ Status� 5�      �� 5�       
 Status#���  6$   5�      5�      5�      5�      