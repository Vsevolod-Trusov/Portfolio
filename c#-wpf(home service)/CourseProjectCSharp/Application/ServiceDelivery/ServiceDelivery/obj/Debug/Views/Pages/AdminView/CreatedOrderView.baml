   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullI)clr-namespace:ServiceDelivery.Views.PagesServiceDelivery.Views.Pages  5      G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  5      <    6ServiceDelivery.Views.Pages.AdminView.CreatedOrderView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      ;local)clr-namespace:ServiceDelivery.Views.Pages     5      >	viewModel(clr-namespace:ServiceDelivery.ViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5        N� Title$  CreatedOrderView��5       � DataContext 5      6   0ServiceDelivery.ViewModels.CreatedOrderViewModel  5   
   .��5      �  � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $	��10* �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��9* �6   �� 5      $��* �6   .+�5   
   �� $��0��6      Filters#���   6%   
�������$
��Left=�5      $��Center=�5      $��14(�5       � 5"   
   $��0��6   $��1��6   $��2��6,    5#      �� 5$      $��* �6#   �� 5%      $��* �6#   �� 5&      $��* �6#   .+�5(      �� $��0��6    
 UnProc#���  6%   $
��Auto��5)      $
��Auto��6"   $��5q�5*      
�������  BtnMenu#���  5,      ��5-      ��  �� Path$ DataContext.DoFilter� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N��� 50      $��1��6     Proc#���  6%   $
��Auto��51      $
��Auto��6"   $��5q�52      
�������#���  54      ��55      �� $# DataContext.DoProcessedFilter� �� $ FindAncestor=�" N��� 5:      $��2��6    	 Compl#���  6%   $
��Auto��5;      $
��Auto��6"   $��5q�5<      
�������#���  5>      ��5?      �� $# DataContext.DoCompletedFilter� �� $ FindAncestor=�" N�5C      &   System.Windows.Controls.DataGrid  5D   
   -   5          Name$ dataGrid��5G      $��1��5D      $��0��5E      $��3��5F      	   AutoGenerateColumns	 .  
   
IsReadOnly
 . $��Center=�5K      $��14(�60   $	��Top=�5L         CanUserResizeColumns .     CanUserResizeRows .     CanUserAddRows .     CanUserDeleteRows .  
������ $
��Auto=�5R        ForegroundBase#���  5S        DataGridHeaderColumnStyle   ColumnHeaderStyle# �  5U      ��5H      �� $ Orders� �� SelectedItem 5T      �� *SelectedOrder+   Columns 5X      0  *System.Windows.Controls.DataGridTextColumn  5Z      1  +System.Windows.Controls.DataGridBoundColumn   Binding 6%   �� $ Customer�,  &System.Windows.Controls.DataGridColumn   Header 5[      �� 5\        Cust#���  6$   5^        5_       6%   �� $ Description� 5`      �� 5a        Description#���  6$      	CellStyle 5c      �� 5d       �� 
TargetType*  $System.Windows.Controls.DataGridCell"  6    .�5e      ��  �� Property � �� �� Value 5f   "   �� 5g   &    �� 
TargetType" ��66   .R�5h   *   �� ��6;   ��  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=���5i   .   �� 5j   2   .R�5k   6   ��  �� TextWrapping$
 Wrap=�5l   >   " �� VerticalScrollBarVisibility$
 Auto=�6R   $��Stretch=�5m   >   $	��2,0q�6Z   $��0q�6g   $��80��5n   >   #���  5o   >   $	��250��5p   >    �� 
IsReadOnly . ��5k   >   �� $
 Text�$ TwoWay=�5q   >   5r   3   5t   +   5u   '   5w      5x      5z        5{       6%   �� $ OrderDateString� 5|      �� 5}       	 	DataOrder#��� 	 6$   5        5�       6%   �� $ DeadlineString� 5�      �� 5�       
 Deadline#��� 
 6$   5�        5�       6%   �� $ Price� 5�      �� 5�       	 Price#���  6$   5�        5�       6%   �� $ Executor� 5�      �� 5�        Executor#���  6$   5�        5�       6%   �� $ Status� 5�      �� 5�       
 Status#���  6$   5�      5�      �� 5�   
   $��2��6   $��0��6   $��3��6.     EditBtn#���  5�      $��Center=�5�      $
��Left=�5�      ��5�      �� $ DataContext.OpenEditPage� �� $ FindAncestor=�" N�5�      5�      5�      