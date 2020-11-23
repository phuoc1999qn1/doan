using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    using Ecommerce.BLL;
    using Ecommerce.DAL.Models;
    using Ecommerce.Common.Req;
    using Ecommerce.Common.Rsp;

    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailController : ControllerBase
    {
        public ProductDetailController()
        {
            _svc = new ProductDetailSvc();
        }

        [HttpPost("get-by-id/{id}")]
        public IActionResult getProductsId(int id)
        {
            var res = new SingleRsp();
            var pro = _svc.getProductsId(id);
            res.Data = pro;
            return Ok(res);
        }

        [HttpPost("get-by-id")]
        public IActionResult getProductDetailById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            res = _svc.Read(req.Id);
            return Ok(res); 
        }

        [HttpPost("get-all")]
        public IActionResult getAllProductDetail()
        {
            var res = new SingleRsp();
            res.Data = _svc.All;
            return Ok(res); // 200:
        }

        [HttpPost("get-product-by-categoryName-linq")]
        public IActionResult GetProductByCategoryId_Linq([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var hist = _svc.GetProductByCategoryId_Linq(req.Keyword, req.Page, req.Size, req.CategoryId);
            res.Data = hist;
            return Ok(res);
        }

        // Lấy ProductId bằng ProductDetailId
        [HttpPost("get-product-id-by-product-detail-id")]
        public IActionResult GetProductIdByProductDetailId_Linq([FromBody] ProductDetailReq req)
        {
            var res = new SingleRsp();
            var proId = _svc.GetProductIdByProductDetailId_Linq(req.ProDetailsId);
            res.Data = proId;

            return Ok(res);
        }

        // Lấy sản phẩm theo loại sản phẩm - KHÔNG PHÂN TRANG (Điện thoại máy tính bảng, điện tử điện lạnh,...)
        [HttpPost("get-product-by-categoryName-no-pagination")]
        public IActionResult GetProductByCategoryId_NoPagination([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var cateId = _svc.GetProductByCategoryId_NoPagination(req.CategoryId);
            res.Data = cateId;

            return Ok(res);
        }

        private readonly ProductDetailSvc _svc;
    }
}
