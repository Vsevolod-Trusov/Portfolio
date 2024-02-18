using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WCFService.DataBase
{
    public class ApplicationContext: DbContext
    {
        public ApplicationContext(): base("DbConnection")
        {
           
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
