using System;
using System.Collections.Generic;
using System.Text;

using Ecommerce.Common.Rsp;
using Ecommerce.Common.BLL;

namespace Ecommerce.BLL
{
    using DAL;
    using DAL.Models;
    using Ecommerce.Common.Req;

    public class CategoriesSvc : GenericSvc<CategoriesRep, Categories>
    {
        #region -- Overrides --
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();

            var m = _rep.Read(id);
            res.Data = m;

            return res;
        }

        public override int Remove(int id)
        {
            var res = new SingleRsp();

            var m = _rep.Remove(id);
            res.Data = m;

            return 0;
        }

        public override SingleRsp Update(Categories m)
        {
            var res = new SingleRsp();

            var m1 = m.CategoryId > 0 ? _rep.Read(m.CategoryId) : _rep.Read(m.CategoryName);
            if (m1 == null)
            {
                res.SetError("EZ103", "No data.");
            }
            else
            {
                res = base.Update(m);
                res.Data = m;
            }

            return res;
        }
        #endregion

        #region -- Methods --

        public object GetProductDetailByCategoryId(int cateId, int proId, int page, int size)
        {
            return _rep.GetProductDetailByCategoryId(cateId, proId, page, size);
        }
        #endregion
    }
}
