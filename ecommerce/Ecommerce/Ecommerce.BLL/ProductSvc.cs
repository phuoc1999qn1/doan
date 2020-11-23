using Ecommerce.Common.Rsp;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.BLL
{
    using DAL;
    using DAL.Models;
    using Ecommerce.Common.BLL;
    using Ecommerce.Common.Req;
    using Ecommerce.Common.Rsp;

    public class ProductSvc : GenericSvc<ProductsRep, Products>
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

        #endregion

        #region -- Method --
        public object GetCateProductNameById_Linq(int cateId)
        {
            return _rep.GetCateProductNameById_Linq(cateId);
        }

        public object GetProductNameByProductId_Linq(int proId)
        {
            return _rep.GetProductNameByProductId_Linq(proId);
        }

        public object GetProductDetailByProductId_Linq(int proId, int page, int size)
        {
            return _rep.GetProductDetailByProductId_Linq(proId, page, size);
        }

        public object SearchProduct(String keyword, int page, int size)
        {
            return _rep.SearchProduct(keyword, page, size);
        }

        public object SearchAllProduct_NoPagination(String keyword)
        {
            return _rep.SearchAllProduct_NoPagination(keyword);
        }

        // Lấy sản phẩm theo id phân loại sản phẩm - KHÔNG PHÂN TRANG
        public object GetProductDetailByProductId_NoPagination(int proId)
        {
            return _rep.GetProductDetailByProductId_NoPagination(proId);
        }
        #endregion
    }
}
