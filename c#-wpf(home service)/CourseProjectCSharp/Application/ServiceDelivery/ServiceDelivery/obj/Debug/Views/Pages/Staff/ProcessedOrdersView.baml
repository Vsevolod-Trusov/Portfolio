   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullU/clr-namespace:ServiceDelivery.Views.Pages.Staff!ServiceDelivery.Views.Pages.Staff  5      K*clr-namespace:ServiceDelivery.Models.StaffServiceDelivery.Models.Staff  5      ;    5ServiceDelivery.Views.Pages.Staff.ProcessedOrdersView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Alocal/clr-namespace:ServiceDelivery.Views.Pages.Staff     5      @	viewModel*clr-namespace:ServiceDelivery.Models.Staff     5        N� Title$  ProcessedOrdersView��5
       � DataContext 5      7   1ServiceDelivery.Models.Staff.ProcessedOrdersModel  5   
   .��5      �  � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $	��10* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��9* �6   �� 5      $��* �6   .+�5   
   �� $��0��6      Filters#���   6%   
�������$
��Left=�5      $��Center=�5      $��14(�5      � 5!   
   $��0��6   $��1��6   $��2��6,    5"      �� 5#      $��* �6#   �� 5$      $��* �6#   .+�5'      �� $��0��6     Proc#���  6%   $
��Auto��5(      $
��Auto��6"   $��5q�5)      
�������  BtnMenu#���  5+      ��5,      ��  �� Path$# DataContext.DoProcessedFilter� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N��� 51      $��1��6    	 Compl#���  6%   $
��Auto��52      $
��Auto��6"   $��5q�53      
�������#���  55      ��56      �� $# DataContext.DoCompletedFilter� �� $ FindAncestor=�" N�5:      &   System.Windows.Controls.DataGrid  5;   
   -   5          Name$ dataGrid��5>      $��1��5;      $��0��5<      $��3��5=      	   AutoGenerateColumns	 .  
�������
   
IsReadOnly
 . $��Center=�5C      $��14(�60   $	��Top=�5D         CanUserResizeColumns .     CanUserResizeRows .     CanUserAddRows .     CanUserDeleteRows .  
������ $
��Auto=�5J        DataGridHeaderColumnStyle   ColumnHeaderStyle# �  5K      ��5?      �� $ Orders� �� SelectedItem 5L      �� *SelectedOrder+   Columns 5O      0  *System.Windows.Controls.DataGridTextColumn  5R      1  +System.Windows.Controls.DataGridBoundColumn   Binding 6%   �� $ Customer�,  &System.Windows.Controls.DataGridColumn   Header 5S      �� 5T        Cust#���  6$   5V        5W       6%   �� $ Description� 5X      �� 5Y        Description#���  6$      	CellStyle 5[      �� 5\       �� 
TargetType*  $System.Windows.Controls.DataGridCell"  6    .�5]      ��  �� Property � �� �� Value 5^   "   �� 5_   &    �� 
TargetType" ��66   .R�5`   *   �� ��6;   ��  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=���5a   .   �� 5b   2   .R�5c   6   ��  �� TextWrapping$
 Wrap=�5d   &   " �� VerticalScrollBarVisibility$
 Auto=�6:   $��Stretch=�5e   &   $	��2,0q�6B   $��0q�6O   $��80��6c   $	��250��5f   >    �� 
IsReadOnly . ��5c   >   �� $
 Text�$ TwoWay=�5g   >   5h   3   5j   +   5k   '   5m      5n      5p        5q       6%   �� $ Price� 5r      �� 5s       	 Price#���  6$   5u        5v       6%   �� $ OrderDateString� 5w      �� 5x        	DataOrder#���  6$   5z        5{       6%   �� $ DeadlineString� 5|      �� 5}       	 Deadline#��� 	 6$   5        5�       6%   �� $ Status� 5�      �� 5�       

 Status#��� 
 6$   5�        5�       6%   �� $ Email� 5�      �� 5�       	 email#���  6$   5�      5�      �� 5�   
   $��2��6   $��0��6   $��3��6.     CompleteBtn#���  5�      $��Center=�5�      $
��Left=�5�      ��5�      �� $! DataContext.OpenConfirmPage� �� $ FindAncestor=�" N�5�      5�      5�      