using Ecommerce.BLL;
using Ecommerce.Common.Req;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Ecommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        public UsersController()
        {
            _svc = new UsersSvc();
        }


        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UsersReq req)
        {
            var res = _svc.Authenticate(req.Email);
            return Ok(res);
        }

        [HttpPost("create-user")]
        public IActionResult CreateUser([FromBody] UsersReq req)
        {
            var res = _svc.CreateUser(req);
            return Ok(res);
        }

        [HttpPost("update-user")]
        public IActionResult UpdateUser([FromBody] UsersReq req)
        {
            var res = _svc.UpdateUser(req);
            return Ok(res);
        }


        [HttpPost("update-address")]
        public IActionResult UpdateAddress([FromBody] UsersReq req)
        {
            var res = _svc.UpdateAddress(req);
            return Ok(res);
        }
        
        [HttpPost("update-password")]
        public IActionResult UpdatePassword([FromBody] UsersReq req)
        {
            var res = _svc.UpdatePassword(req);
            return Ok(res);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var email = claim[0].Value;
            var res = _svc.LoadUsers(email);
            return Ok(res);
        }

        [HttpPost("get-hash-pw")]
        public IActionResult HashPW([FromBody] UsersReq req)
        {
            var res = _svc.HashPW(req.Email);
            return Ok(res);
        }


        private readonly UsersSvc _svc;
    }
}