using Ecommerce.Common.DAL;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ecommerce.DAL
{
    public class CategoriesRep : GenericRep<EcommerceContext, Categories>
    {
        #region -- Overrides --
        public override Categories Read(int id)
        {
            var res = All.FirstOrDefault(p => p.CategoryId == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = base.All.First(i => i.CategoryId == id);
            m = base.Delete(m);
            return m.CategoryId;
        }
        #endregion

        #region -- methods --

        // Lấy sản phẩm chi tiết bằng categoryID
        public object GetProductDetailByCategoryId(int cateId, int proId, int page, int size)
        {
            var pro = Context.ProductDetails
                .Join(Context.Products, a => a.ProductId, b => b.ProductId, (a, b) => new
                {
                    a.ProDetailsId,
                    a.ProName,
                    a.Price,
                    a.UnitsInStock,
                    a.Manufacturer,
                    a.Image,
                    b.ProductId,
                    b.ProductName,
                    b.CategoryId
                }).Where(x => x.CategoryId == cateId && x.ProductId == proId).ToList();

            var offset = (page - 1) * size;
            var total = pro.Count();
            int totalPages = (total % size) == 0 ? (int)(total / size) : (int)((total / size) + 1);
            var data = pro.OrderBy(x => x.ProDetailsId).Skip(offset).Take(size).ToList();

            var res = new
            {
                Data = data,
                TotalRecord = total,
                TotalPages = totalPages,
                Page = page,
                Size = size
            };

            return res;
        }

        #endregion

    }
}
