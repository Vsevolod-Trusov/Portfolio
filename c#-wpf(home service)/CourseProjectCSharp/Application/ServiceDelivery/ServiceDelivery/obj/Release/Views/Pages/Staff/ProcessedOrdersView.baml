   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullU/clr-namespace:ServiceDelivery.Views.Pages.Staff!ServiceDelivery.Views.Pages.Staff  K*clr-namespace:ServiceDelivery.Models.StaffServiceDelivery.Models.Staff  ;    5ServiceDelivery.Views.Pages.Staff.ProcessedOrdersView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Alocal/clr-namespace:ServiceDelivery.Views.Pages.Staff     @	viewModel*clr-namespace:ServiceDelivery.Models.Staff       N� Title$  ProcessedOrdersView�� � DataContext 7   1ServiceDelivery.Models.Staff.ProcessedOrdersModel  .���  � RowDefinitions �� $��* ��� $	��10* ��� $��* � � ColumnDefinitions �� $��* ��� $��9* ��� $��* �.+��� $��0��   Filters#���   
�������$
��Left=�$��Center=�$��14(�� $��0��$��1��$��2�� �� $��* ��� $��* �.+��� $��0��  Proc#���  $
��Auto��$
��Auto��$��5q�
�������  BtnMenu#���  ����  �� Path$# DataContext.DoProcessedFilter� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N��� $��1�� 	 Compl#���  $
��Auto��$
��Auto��$��5q�
�������#���  ���� $# DataContext.DoCompletedFilter� �� $ FindAncestor=�" N�&   System.Windows.Controls.DataGrid  -     Name$ dataGrid��$��1��$��0��$��3��	   AutoGenerateColumns	 .  
�������
   
IsReadOnly
 . $��Center=�$��14(�$	��Top=�   CanUserResizeColumns .     CanUserResizeRows .     CanUserAddRows .     CanUserDeleteRows .  
������ $
��Auto=�  DataGridHeaderColumnStyle   ColumnHeaderStyle# �  ���� $ Orders� �� SelectedItem �� *SelectedOrder+   Columns 0  *System.Windows.Controls.DataGridTextColumn  1  +System.Windows.Controls.DataGridBoundColumn   Binding �� $ Customer�,  &System.Windows.Controls.DataGridColumn   Header ��   Cust#���  ����  �� 
TargetType" ��.���  �� Property � �� �� Value
 ����� �� Triggers P�  P� Property �@J�IsMouseOver P� Value . . ���  � ��  HeaderColumnOver# �     �� $ Description� ��   Description#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     	CellStyle �� *  $System.Windows.Controls.DataGridCell"  .���  � �� ��  �� 
TargetType" ��.R��� ����  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=����� .R���  �� TextWrapping$
 Wrap=�" �� VerticalScrollBarVisibility$
 Auto=�$��Stretch=�$	��2,0q�$��0q�$��80��$	��250�� �� 
IsReadOnly . ���� $
 Text�$ TwoWay=�   �� $ Price� ��  	 Price#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ OrderDateString� ��  	 	DataOrder#��� 	 ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ DeadlineString� ��  
 Deadline#��� 
 ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ Status� ��  
 Status#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ Email� ��  	 email#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �  �� $��2��$��0��$��3��  CompleteBtn#���  $��Center=�$
��Left=����� $! DataContext.OpenConfirmPage� �� $ FindAncestor=�" N�