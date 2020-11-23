using System;
using System.Collections.Generic;

namespace Ecommerce.DAL.Models
{
    public partial class Users
    {
        public Users()
        {
            Order = new HashSet<Order>();
        }

        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int RoleId { get; set; }

        public virtual ICollection<Order> Order { get; set; }
    }
}
