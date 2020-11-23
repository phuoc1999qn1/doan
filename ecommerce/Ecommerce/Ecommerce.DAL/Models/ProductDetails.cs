using System;
using System.Collections.Generic;

namespace Ecommerce.DAL.Models
{
    public partial class ProductDetails
    {
        public ProductDetails()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        public int ProDetailsId { get; set; }
        public string ProName { get; set; }
        public decimal Price { get; set; }
        public int UnitsInStock { get; set; }
        public string Manufacturer { get; set; }
        public string Image { get; set; }
        public int? ProductId { get; set; }

        public virtual Products Product { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
