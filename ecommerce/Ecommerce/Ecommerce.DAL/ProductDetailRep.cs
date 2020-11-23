using Ecommerce.Common.DAL;
using Ecommerce.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ecommerce.DAL
{
    public class ProductDetailRep : GenericRep<EcommerceContext, ProductDetails>
    {
        #region -- Override --
        public override ProductDetails Read(int id)
        {
            var res = All.FirstOrDefault(p => p.ProDetailsId == id);
            return res;
        }


        public int Remove(int id)
        {
            var m = base.All.FirstOrDefault(p => p.ProDetailsId == id);
            m = base.Delete(m);
            return m.ProDetailsId;
        }
        #endregion

        #region -- Methods --
        // Lấy sản phẩm theo loại sản phẩm (Điện thoại - laptop)
        public object GetProductByCategoryId_Linq(String keyword, int page, int size, int categoryId)
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
                    b.CategoryId
                }).Where(x => x.CategoryId == categoryId).ToList();
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

        // Lấy sản phẩm theo loại sản phẩm - KHÔNG PHÂN TRANG (Điện thoại máy tính bảng, điện tử điện lạnh,...)
        public object GetProductByCategoryId_NoPagination(int categoryId)
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
                    b.CategoryId
                }).Where(x => x.CategoryId == categoryId).ToList();

            return pro;
        }

        public object getProductsId(int id)
        {
            var res = Context.ProductDetails
                .Join(Context.Products, a => a.ProductId, b => b.ProductId, (a, b) => new
                {
                    a.ProductId,
                    a.ProDetailsId,
                    a.ProName,
                    a.Price,
                    a.UnitsInStock,
                    a.Manufacturer,
                    a.Image,
                    b.CategoryId
                }).Where(x => x.ProDetailsId == id).First();

            return res;
        }

        // Lấy ProductId bằng ProductDetailId
        public object GetProductIdByProductDetailId_Linq(int id)
        {
            var pro = Context.ProductDetails
                .Join(Context.Products, a => a.ProductId, b => b.ProductId, (a, b) => new
                {
                    a.ProDetailsId,
                    a.ProName,
                    b.ProductId
                }).Where(x => x.ProDetailsId == id).ToList();
            return pro;
        }
        #endregion
    }
}
