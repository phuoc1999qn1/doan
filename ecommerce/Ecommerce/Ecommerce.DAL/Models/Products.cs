using System;
using System.Collections.Generic;

namespace Ecommerce.DAL.Models
{
    public partial class Products
    {
        public Products()
        {
            ProductDetails = new HashSet<ProductDetails>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }

        public virtual Categories Category { get; set; }
        public virtual ICollection<ProductDetails> ProductDetails { get; set; }
    }
}
