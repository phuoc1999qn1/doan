using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.BLL;
using Ecommerce.Common.Req;
using Ecommerce.Common.Rsp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public ProductController()
        {
            _svc = new ProductSvc();
        }

        [HttpPost("get-by-id")]
        public IActionResult getProductById([FromBody] SimpleReq req)
        {
            var res = new SingleRsp();
            res = _svc.Read(req.Id);
            return Ok(res);
        }

        [HttpPost("get-cateproduct-by-id")]
        public IActionResult GetCateProductNameById_Linq([FromBody] ProductReq req)
        {
            var res = new SingleRsp();
            var cateId = _svc.GetCateProductNameById_Linq(req.CategoryId);
            res.Data = cateId;

            return Ok(res);
        }

        [HttpPost("get-productName-by-productId")]
        public IActionResult GetProductNameByProductId_Linq([FromBody] ProductReq req)
        {
            var res = new SingleRsp();
            var proId = _svc.GetProductNameByProductId_Linq(req.ProductId);
            res.Data = proId;

            return Ok(res);
        }

        [HttpPost("get-product-detail-by-product-id")]
        public IActionResult GetProductDetailByProductId_Linq([FromBody] ProductDetailReq req)
        {
            var res = new SingleRsp();
            var proId = _svc.GetProductDetailByProductId_Linq(req.ProductId, req.Page, req.Size);
            res.Data = proId;

            return Ok(res);
        }

        // Tìm kiếm sản phẩm
        [HttpPost("search-product")]
        public IActionResult SearchProduct([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var search = _svc.SearchProduct(req.Keyword, req.Page, req.Size);
            res.Data = search;

            return Ok(res);
        }

        [HttpPost("search-all-product-non-pagination")]
        public IActionResult SearchAllProduct_NoPagination([FromBody] SearchReq req)
        {
            var res = new SingleRsp();
            var search = _svc.SearchAllProduct_NoPagination(req.Keyword);
            res.Data = search;

            return Ok(res);
        }

        [HttpPost("get-product-detail-by-product-id-no-pagination")]
        public IActionResult GetProductDetailByProductId_NoPagination([FromBody] ProductReq req)
        {
            var res = new SingleRsp();
            var proId = _svc.GetProductDetailByProductId_NoPagination(req.ProductId);
            res.Data = proId;

            return Ok(res);
        }


        private readonly ProductSvc _svc;
    }
}
