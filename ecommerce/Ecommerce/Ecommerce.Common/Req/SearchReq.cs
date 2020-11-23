using System;
using System.Collections.Generic;
using System.Text;

namespace Ecommerce.Common.Req
{
    public class SearchReq
    {
        public int Page { get; set; }

        public int Size { get; set; }
        
        public int CategoryId { get; set; }

        public string Keyword { get; set; }
    }
}
