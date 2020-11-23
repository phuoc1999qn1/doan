

using System;

namespace Ecommerce.Common.Req
{
    public class OrderReq
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
    }
}
