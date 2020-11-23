using Ecommerce.Common.BLL;
using Ecommerce.Common.Req;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL;
using Ecommerce.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.BLL
{
    public class ContactSvc : GenericSvc<ContactRep, Contact>
    {
        #region -- Overrides --
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();

            var m = _rep.Read(id);
            res.Data = m;

            return res;
        }


        #endregion

        #region Method
        public SingleRsp CreateContact(ContactReq contact)
        {
            var res = new SingleRsp();
            Contact c = new Contact();

            c.FullName = contact.FullName;
            c.Email = contact.Email;
            c.PhoneNumber = contact.PhoneNumber;
            c.Message = contact.Message;

            res = _rep.CreateContact(c);
            return res;
        }

        #endregion
    }
}
