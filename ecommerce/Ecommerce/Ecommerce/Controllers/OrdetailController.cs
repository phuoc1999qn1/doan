using Ecommerce.BLL;
using Ecommerce.Common.Req;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdetailController : ControllerBase
    {
        public OrdetailController()
        {
            _svc = new OrderDetailSvc();
        }

        [HttpPost("Create-OrderDetail")]
        public IActionResult CreateOrderDetail([FromBody] OrderDetailReq req)
        {
            var res = _svc.CreateOrderDetail(req);
            return Ok(res);
        }

        private readonly OrderDetailSvc _svc;

    }
}
