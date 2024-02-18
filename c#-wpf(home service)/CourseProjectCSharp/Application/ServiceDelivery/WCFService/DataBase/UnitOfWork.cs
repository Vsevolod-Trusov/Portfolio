using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WCFService.DBModel;

namespace WCFService.DataBase
{
    public class UnitOfWork: IDisposable 
    {
        private ApplicationContext DB = new ApplicationContext();
        private GenericRepository<UserLogin> userLoginRepository;
        
        
        public GenericRepository<UserLogin> Repository
        {
            get
            {
                if (userLoginRepository == null)
                    userLoginRepository = new GenericRepository<UserLogin>(DB);
                return userLoginRepository;
            }
        }

        public void Save()
        {
            DB.SaveChanges();
        }
        public void SaveAsync()
        {
            DB.SaveChangesAsync();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    DB.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
