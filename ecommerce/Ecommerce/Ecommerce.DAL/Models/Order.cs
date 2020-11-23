using System;
using System.Collections.Generic;

namespace Ecommerce.DAL.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
