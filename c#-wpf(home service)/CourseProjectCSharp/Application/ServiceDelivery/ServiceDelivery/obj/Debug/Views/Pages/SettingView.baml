   M S B A M L   `   `   `  ����J  FServiceDelivery, Version=1.0.0.0, Culture=neutral, PublicKeyToken=nullI)clr-namespace:ServiceDelivery.Views.PagesServiceDelivery.Views.Pages  5      G(clr-namespace:ServiceDelivery.ViewModelsServiceDelivery.ViewModels  5      -    'ServiceDelivery.Views.Pages.SettingView   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      ;local)clr-namespace:ServiceDelivery.Views.Pages     5      >	viewModel(clr-namespace:ServiceDelivery.ViewModels     5      _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5        N� Title$  SettingView��5       � DataContext 5      2   ,ServiceDelivery.ViewModels.SettingsViewModel  5   
   .��5      �  � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6    � ColumnDefinitions 5   
   �� 5      $��* �6   �� 5      $��* �6   .+�5   
   �� $��14(�6   
�������$��0��65   $��0��6B    	  Theme#���   5      $��Center=�5      $	��Top=�5      �� 5   
   -   5        $��ThemeBtn��5      $��0��5      $��1��6     BtnMenu#���  5      $	��Top=�5       $
��Left=�5!      $��	10 0 10 0q�5"      ��5#      �� *ThemeContent+��5$      �� *SwitchTheme+�� 5%   
   $��14(�6   
�������$��1��65   $��0��6B     Lang#���  5&      $��Center=�5'      $	��Top=�5(      �� 5)   
   -   5        $��LangBtn��5*      $��1��5)      $��1��6   #���  5+      $	��Top=�5,      $
��Left=�5-      $��	10 0 10 0q�5.      ��5/      �� *LangContent+��50      �� *
SwitchLang+51      52      