using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace WCFService.DataBase
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        private ApplicationContext context;

        public GenericRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public void Add(T item)
        {
            object p = context.Set<T>().Add(item);
        }

        public T Get(int id)
        {
            return context.Set<T>().Find(id);
        }

        public List<T> GetAll()
        {
            return context.Set<T>().ToList();
        }

        public void Remove(int id)
        {
            context.Set<T>().Remove(Get(id));
        }

        public void Update(T item)
        {
            context.Entry(item).State = EntityState.Modified;
        }
    }
}