using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Common.Req
{
    public class ContactReq
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Message { get; set; }
    }
}
