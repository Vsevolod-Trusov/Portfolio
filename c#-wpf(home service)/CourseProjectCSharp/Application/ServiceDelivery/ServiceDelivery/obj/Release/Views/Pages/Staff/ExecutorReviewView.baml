   M S B A M L   `   `   `  ���� J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullU/clr-namespace:ServiceDelivery.Views.Pages.Staff!ServiceDelivery.Views.Pages.Staff  g8clr-namespace:ServiceDelivery.ViewModels.StaffViewModels*ServiceDelivery.ViewModels.StaffViewModels  :    4ServiceDelivery.Views.Pages.Staff.ExecutorReviewView   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     @d2http://schemas.microsoft.com/expression/blend/2008     Alocal/clr-namespace:ServiceDelivery.Views.Pages.Staff     N	viewModel8clr-namespace:ServiceDelivery.ViewModels.StaffViewModels       N� Title$  ExecutorReviewView�� � DataContext H   BServiceDelivery.ViewModels.StaffViewModels.ExecutorReviewViewModel  .���  � RowDefinitions �� $��* ��� $	��10* � � ColumnDefinitions �� $��* ��� $��9* ��� $��* �.+�&   System.Windows.Controls.DataGrid  -     Name$ dataGrid��$��1��$��0��$��3��   AutoGenerateColumns .  
�������   
IsReadOnly . $��Center=�$��14(�$	��Top=�   CanUserResizeColumns .     CanUserResizeRows .  	   CanUserAddRows	 .  
   CanUserDeleteRows
 .  
������ $
��Auto=�   HeadersVisibility$
 None=�   DataGridHeaderColumnStyle   ColumnHeaderStyle# �   ���� *	Reviews+ �� SelectedItem �� *SelectedReview+   Columns 4  .System.Windows.Controls.DataGridTemplateColumn    	DeleteBtn,  &System.Windows.Controls.DataGridColumn   Header# �     CellTemplate �� .R��� #���    BtnMenu#���  
�������$	��100��$
��Left=�$
��Left=�����  �� Path$ DataContext.DeleteReview� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�  $ Image��   Width5  /System.Windows.Controls.DataGridLengthConverter$ *  �� .R��� $��50��$��50������ *	ImagePath+0  *System.Windows.Controls.DataGridTextColumn  $ Content��$ * 1  +System.Windows.Controls.DataGridBoundColumn   Binding �� *ContentMessage+   	CellStyle ��  �� 
TargetType*  $System.Windows.Controls.DataGridCell"  .���  �� Property � �� �� Value ��  �� 
TargetType" ��.R��� ����  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=����� .R���  �� TextWrapping$
 Wrap=�" �� VerticalScrollBarVisibility$
 Auto=�$��Stretch=�$	��2,0q�$��0q�$��80��$	��250�� �� 
IsReadOnly . ���� $
 Text�$ TwoWay=�  $ 
Estimation��$ *  �� $ 
Estimation�  