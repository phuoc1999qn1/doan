﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Common.Req
{
    public class ProductReq
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
    }
}
