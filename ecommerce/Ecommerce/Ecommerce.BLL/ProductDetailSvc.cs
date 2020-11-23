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

    public class ProductDetailSvc : GenericSvc<ProductDetailRep, ProductDetails>
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
        public object getProductsId(int id)
        {
            return _rep.getProductsId(id);
        }


        public object GetProductByCategoryId_Linq(String keyword, int page, int size, int categoryId)
        {
            return _rep.GetProductByCategoryId_Linq(keyword, page, size, categoryId);
        }

        // Lấy ProductId bằng ProductDetailId
        public object GetProductIdByProductDetailId_Linq(int id)
        {
            return _rep.GetProductIdByProductDetailId_Linq(id);
        }

        // Lấy sản phẩm theo loại sản phẩm - KHÔNG PHÂN TRANG (Điện thoại máy tính bảng, điện tử điện lạnh,...)
        public object GetProductByCategoryId_NoPagination(int categoryId)
        {
            return _rep.GetProductByCategoryId_NoPagination(categoryId);
        }
        #endregion
    }
}
