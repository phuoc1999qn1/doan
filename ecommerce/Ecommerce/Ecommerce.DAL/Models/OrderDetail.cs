using System;
using System.Collections.Generic;

namespace Ecommerce.DAL.Models
{
    public partial class OrderDetail
    {
        public int OrderDetailId { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public double? Discount { get; set; }
        public int Status { get; set; }
        public int OrderId { get; set; }
        public int ProDetailsId { get; set; }

        public virtual Order Order { get; set; }
        public virtual ProductDetails ProDetails { get; set; }
    }
}
