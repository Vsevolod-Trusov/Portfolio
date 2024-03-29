﻿#pragma checksum "..\..\..\Views\MainWindowView.xaml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "C5DA94965D8309AC707F702935496379701B56652D4A2F67BDF3BFD6AE9E0318"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using ServiceDelivery.ViewModels;
using ServiceDelivery.Views;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace ServiceDelivery.Views {
    
    
    /// <summary>
    /// MainWindowView
    /// </summary>
    public partial class MainWindowView : System.Windows.Window, System.Windows.Markup.IComponentConnector {
        
        
        #line 126 "..\..\..\Views\MainWindowView.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image lineImg;
        
        #line default
        #line hidden
        
        
        #line 147 "..\..\..\Views\MainWindowView.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image WinImg;
        
        #line default
        #line hidden
        
        
        #line 160 "..\..\..\Views\MainWindowView.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Image CrossImg;
        
        #line default
        #line hidden
        
        
        #line 201 "..\..\..\Views\MainWindowView.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal System.Windows.Controls.Frame MainFrame;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/ServiceDelivery;component/views/mainwindowview.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\..\Views\MainWindowView.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            
            #line 46 "..\..\..\Views\MainWindowView.xaml"
            ((System.Windows.Controls.Grid)(target)).MouseDown += new System.Windows.Input.MouseButtonEventHandler(this.Shape_ChangeLocation);
            
            #line default
            #line hidden
            return;
            case 2:
            this.lineImg = ((System.Windows.Controls.Image)(target));
            
            #line 129 "..\..\..\Views\MainWindowView.xaml"
            this.lineImg.MouseDown += new System.Windows.Input.MouseButtonEventHandler(this.Hide_HelloClientWindow);
            
            #line default
            #line hidden
            return;
            case 3:
            this.WinImg = ((System.Windows.Controls.Image)(target));
            
            #line 148 "..\..\..\Views\MainWindowView.xaml"
            this.WinImg.MouseDown += new System.Windows.Input.MouseButtonEventHandler(this.Maximize_HelloClientWindow);
            
            #line default
            #line hidden
            
            #line 149 "..\..\..\Views\MainWindowView.xaml"
            this.WinImg.MouseEnter += new System.Windows.Input.MouseEventHandler(this.ChangeImage_HelloClientWindow);
            
            #line default
            #line hidden
            
            #line 150 "..\..\..\Views\MainWindowView.xaml"
            this.WinImg.MouseLeave += new System.Windows.Input.MouseEventHandler(this.ChangeImageBack_HelloClientWindow);
            
            #line default
            #line hidden
            return;
            case 4:
            this.CrossImg = ((System.Windows.Controls.Image)(target));
            
            #line 161 "..\..\..\Views\MainWindowView.xaml"
            this.CrossImg.MouseDown += new System.Windows.Input.MouseButtonEventHandler(this.Close_HelloClientWindow);
            
            #line default
            #line hidden
            return;
            case 5:
            this.MainFrame = ((System.Windows.Controls.Frame)(target));
            return;
            }
            this._contentLoaded = true;
        }
    }
}

