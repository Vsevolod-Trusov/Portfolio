   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullU/clr-namespace:ServiceDelivery.Views.Pages.Staff!ServiceDelivery.Views.Pages.Staff  5      g8clr-namespace:ServiceDelivery.ViewModels.StaffViewModels*ServiceDelivery.ViewModels.StaffViewModels  5      :    4ServiceDelivery.Views.Pages.Staff.ExecutorReviewView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Alocal/clr-namespace:ServiceDelivery.Views.Pages.Staff     5      N	viewModel8clr-namespace:ServiceDelivery.ViewModels.StaffViewModels     5        N� Title$  ExecutorReviewView��5
       � DataContext 5      H   BServiceDelivery.ViewModels.StaffViewModels.ExecutorReviewViewModel  5   
   .��5      �  � RowDefinitions 5   
   �� 5      $��* �6   �� 5      $	��10* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��9* �6   �� 5      $��* �6   .+�5   
   &   System.Windows.Controls.DataGrid  -   5          Name$ dataGrid��5      $��1��5      $��0��5      $��3��5         AutoGenerateColumns .  
�������   
IsReadOnly . $��Center=�5!      $��14(�60   $	��Top=�5"         CanUserResizeColumns .     CanUserResizeRows .  	   CanUserAddRows	 .  
   CanUserDeleteRows
 .  
������ $
��Auto=�5(         HeadersVisibility$
 None=�5+         DataGridHeaderColumnStyle   ColumnHeaderStyle# �   5,      ��5)      �� *	Reviews+ �� SelectedItem 5*      �� *SelectedReview+   Columns 5/      4  .System.Windows.Controls.DataGridTemplateColumn  50        	DeleteBtn,  &System.Windows.Controls.DataGridColumn   Header# �  6)      CellTemplate 51      �� 52      .R�53      �� #���  6%     BtnMenu#���  6L   
�������$	��100��57   %   $
��Left=�58   %   $
��Left=�59   %   ��54   $   ��  �� Path$ DataContext.DeleteReview� �� RelativeSource ��  �� Mode$ FindAncestor=� �� AncestorType" N�59   %   5;      5>        5?      $ Image��6)      Width5  /System.Windows.Controls.DataGridLengthConverter$ * 68    5@      �� 5A      .R�5B      �� $��50��6$   $��50��60   ��6;   �� *	ImagePath+5C      5E      0  *System.Windows.Controls.DataGridTextColumn  5F      $ Content��6&   $ * 67   1  +System.Windows.Controls.DataGridBoundColumn   Binding 6A   �� *ContentMessage+   	CellStyle 5G      �� 5H       �� 
TargetType*  $System.Windows.Controls.DataGridCell"  6    .�5I      ��  �� Property � �� �� Value 5J   "   �� 5K   &    �� 
TargetType" ��66   .R�5L   *   �� ��6;   ��  �� *TemplatedParent+$ Content� �� Mode$ TwoWay=���5M   .   �� 5N   2   .R�5O   6   ��  �� TextWrapping$
 Wrap=�5P   &   " �� VerticalScrollBarVisibility$
 Auto=�6:   $��Stretch=�5Q   &   $	��2,0q�6B   $��0q�6O   $��80��6c   $	��250��5R   >    �� 
IsReadOnly . ��5O   >   �� $
 Text�$ TwoWay=�5S   >   5T   3   5V   +   5W   '   5Y      5Z      5\        5]      $ 
Estimation��6I   $ * 6]    6%   �� $ 
Estimation�6]     5^      5`      5a      5b      