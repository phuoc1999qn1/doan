
namespace Ecommerce.Common.Req
{
    public class OrderDetailReq
    {
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public double? Discount { get; set; }
        public int Status { get; set; }
        public int OrderId { get; set; }
        public int ProDetailsId { get; set; }

    }
}
