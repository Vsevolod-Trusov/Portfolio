//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WCFService.DBModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class ServiceOrder
    {
        public System.Guid Id { get; set; }
        public System.Guid CustomerProfileId { get; set; }
        public Nullable<System.Guid> ExecutorProfileId { get; set; }
        public Nullable<System.DateTime> DataOrder { get; set; }
        public Nullable<System.Guid> ServiceTypeId { get; set; }
        public string Desctiption { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string ExecutionStatus { get; set; }
        public Nullable<System.DateTime> Deadline { get; set; }
    
        public virtual UserProfile CustomerProfile { get; set; }
        public virtual UserProfile ExecutorProfile { get; set; }
        public virtual ServiceType ServiceType { get; set; }
    }
}