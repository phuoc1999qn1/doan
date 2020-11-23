using Ecommerce.BLL;
using Ecommerce.Common.Req;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public OrderController()
        {
            _svc = new OrderSvc();
        }

        [HttpPost("Create-Order")]
        public IActionResult CreateOrder([FromBody] OrderReq req)
        {
            var res = _svc.CreateOrder(req);
            return Ok(res);
        }


        [HttpGet("Show-Order/{userId}")]
        public IActionResult showHistoryOrder(int userId)
        {
            var res = _svc.showHistoryOrder(userId);
            return Ok(res);
        }
        private readonly OrderSvc _svc;

    }
}
