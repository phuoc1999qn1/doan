using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    using BLL;
    using DAL.Models;
    using Common.Req;
    using Common.Rsp;
    
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public CategoriesController()
        {
            _svc = new CategoriesSvc();
        }

        [HttpGet("get-all")]
        public IActionResult getAllCategory()
        {
            var res = new SingleRsp();
            res.Data = _svc.All;
            return Ok(res);
        }

        [HttpPost("get-product-detail-by-category-id")]
        public IActionResult GetProductDetailByCategoryId([FromBody] CategoriesReq req)
        {
            var res = new SingleRsp();
            res.Data = _svc.GetProductDetailByCategoryId(req.CategoryId, req.ProductId, req.Page, req.Size);

            return Ok(res);
        }

        private readonly CategoriesSvc _svc;
    }
}
