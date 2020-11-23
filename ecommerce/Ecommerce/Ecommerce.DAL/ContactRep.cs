using Ecommerce.Common.DAL;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.DAL
{
    public class ContactRep : GenericRep<EcommerceContext, Contact>
    {
        #region -- methods --


        public SingleRsp CreateContact(Contact contact)
        {
            var res = new SingleRsp();
            using (var context = new EcommerceContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Contact.Add(contact);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
        #endregion
    }
}
