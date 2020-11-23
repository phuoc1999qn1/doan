using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.BLL;
using Ecommerce.Common.Req;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        public ContactController()
        {
            _svc = new ContactSvc();
        }

        // Create new
        [HttpPost("create-contact")]
        public IActionResult CreateContact([FromBody] ContactReq req)
        {
            var res = _svc.CreateContact(req);

            return Ok(res);
        }

        private readonly ContactSvc _svc;
    }
}
