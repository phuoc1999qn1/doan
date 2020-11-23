using Ecommerce.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.DAL
{
    using Ecommerce.Common.DAL;
    using Ecommerce.Common.Rsp;
    using Ecommerce.DAL.Models;
    using System.Linq;

    public class ProductsRep : GenericRep<EcommerceContext, Products>
    {
        #region -- Override --
        public override Products Read(int id)
        {
            var res = All.FirstOrDefault(p => p.ProductId == id);
            return res;
        }


        public int Remove(int id)
        {
            var m = base.All.FirstOrDefault(p => p.ProductId == id);
            m = base.Delete(m);
            return m.ProductId;
        }
        #endregion

        #region -- Methods --
        // Lấy tên phân loại sản phẩm theo id loại sản phẩm (Điện thoại smart phone, máy tính bảng,...)
        public object GetCateProductNameById_Linq(int cateId)
        {
            var pro = Context.Products
                .Join(Context.Categories, a => a.CategoryId, b => b.CategoryId, (a, b) => new
                {
                    a.ProductId,
                    a.ProductName,
                    a.CategoryId
                }).Where(x => x.CategoryId == cateId).ToList();
            return pro;
        }

        public object GetProductNameByProductId_Linq(int proId)
        {
            var pro = Context.Products
                .Join(Context.Categories, a => a.CategoryId, b => b.CategoryId, (a, b) => new
                {
                    a.ProductId,
                    a.ProductName,
                    a.CategoryId
                }).Where(x => x.ProductId == proId).ToList();
            return pro;
        }
        

        // Lấy sản phẩm theo id phân loại sản phẩm
        public object GetProductDetailByProductId_Linq(int proId, int page, int size)
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
                }).Where(x => x.ProductId == proId).ToList();

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

        // Lấy sản phẩm theo id phân loại sản phẩm - KHÔNG PHÂN TRANG
        public object GetProductDetailByProductId_NoPagination(int proId)
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
                }).Where(x => x.ProductId == proId).ToList();

            return pro;
        }

        // Tìm kiếm sản phẩm
        public object SearchProduct(String keyword, int page, int size)
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
                })
                .Join(Context.Categories, a => a.CategoryId, b => b.CategoryId, (a, b) => new
                {
                    a.ProDetailsId,
                    a.ProName,
                    a.Price,
                    a.UnitsInStock,
                    a.Manufacturer,
                    a.Image,
                    b.CategoryId,
                    b.CategoryName
                });

            if (!string.IsNullOrEmpty(keyword))
            {
                pro = pro.Where(x => x.ProName.Contains(keyword.Trim()) || x.ProName.StartsWith(keyword) || x.ProName.EndsWith(keyword) || x.CategoryName.Contains(keyword.Trim()));
            }

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

        // Tìm kiếm tất cả sản phẩm, không phân trang
        public object SearchAllProduct_NoPagination(String keyword)
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
                })
                .Join(Context.Categories, a => a.CategoryId, b => b.CategoryId, (a, b) => new
                {
                    a.ProDetailsId,
                    a.ProName,
                    a.Price,
                    a.UnitsInStock,
                    a.Manufacturer,
                    a.Image,
                    b.CategoryId,
                    b.CategoryName
                });

            if (!string.IsNullOrEmpty(keyword))
            {
                pro = pro.Where(x => x.ProName.Contains(keyword.Trim()) || x.ProName.StartsWith(keyword) || x.ProName.EndsWith(keyword));
            }

            return pro;
        }


        #endregion
    }
}
