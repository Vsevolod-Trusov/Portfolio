   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nulle7clr-namespace:ServiceDelivery.ViewModels.UserViewModels)ServiceDelivery.ViewModels.UserViewModels  [2clr-namespace:ServiceDelivery.Views.Pages.UserView$ServiceDelivery.Views.Pages.UserView  5    /ServiceDelivery.Views.Pages.UserView.OrdersView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     M	viewModel7clr-namespace:ServiceDelivery.ViewModels.UserViewModels     Dlocal2clr-namespace:ServiceDelivery.Views.Pages.UserView     _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    N� Title$  
OrdersView�� � DataContext ?   9ServiceDelivery.ViewModels.UserViewModels.OrdersViewModel  .���  � RowDefinitions �� $��* ��� $	��10* � � ColumnDefinitions �� $��* ��� $��9* ��� $��2* �.+��� $��0��   Filters#���   
�������$
��Left=�$��Center=�$��14(�� $��0��$��1��$��2�� �� $��* ��� $��* ��� $��* �.+��� $��0�� 
 UnProc#���  $
��Auto��$
��Auto��$��5q�
�������  BtnMenu#���  ����  �� Path$ DataContext.DoFilter� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N��� $��1��  Proc#���  $
��Auto��$
��Auto��$��5q�
�������#���  ���� $# DataContext.DoProcessedFilter� �� $ FindAncestor=�" N��� $��2�� 	 Compl#���  $
��Auto��$
��Auto��$��5q�
�������#���  ���� $# DataContext.DoCompletedFilter� �� $ FindAncestor=�" N�&   System.Windows.Controls.DataGrid  -     Name$ dataGrid��$��1��$��0��$��3��	   AutoGenerateColumns	 .  
�������
   
IsReadOnly
 . $��Center=�$��14(�$	��Top=�   CanUserResizeColumns .     CanUserResizeRows .     CanUserAddRows .     CanUserDeleteRows .  
������ $
��Auto=�$
��Auto=�  DataGridHeaderColumnStyle   ColumnHeaderStyle# �  ���� $ CustomerOrders� �� SelectedItem �� *SelectedOrder+   Columns 0  *System.Windows.Controls.DataGridTextColumn  1  +System.Windows.Controls.DataGridBoundColumn   Binding �� $ Description�,  &System.Windows.Controls.DataGridColumn   Header ��   Description#���  $��Center=�����  �� 
TargetType" ��.���  �� Property � �� �� Value
 ����� �� Triggers P�  P� Property �@J�IsMouseOver P� Value . . ���  � ��  HeaderColumnOver# �     	CellStyle �� *  $System.Windows.Controls.DataGridCell"  .���  � �� ��  �� 
TargetType" ��.R��� ����  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=����� .R���  �� TextWrapping$
 Wrap=�" �� VerticalScrollBarVisibility$
 Auto=�$��Stretch=�$	��2,0q�$��0q�$��80��$	��250�� �� 
IsReadOnly . ���� $
 Text�$ TwoWay=�   �� $ OrderDateString� ��   	DataOrder#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ DeadlineString� ��  	 Deadline#��� 	 ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ Price� ��  	
 Price#��� 
 ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ Executor� ��   Executor#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �     �� $ Status� ��  
 Status#���  ���� " ��.���  � ��
 ����� P�  �@J�IsMouseOver . . ���  � ��# �  