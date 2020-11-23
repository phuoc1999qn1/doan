using Ecommerce.Common.BLL;
using Ecommerce.Common.Req;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL;
using Ecommerce.DAL.Models;

namespace Ecommerce.BLL
{
    public class OrderDetailSvc : GenericSvc<OrderDetailRep, OrderDetail>
    {
        public SingleRsp CreateOrderDetail(OrderDetailReq ordDetail)
        {
            var res = new SingleRsp();
            OrderDetail ord = new OrderDetail();
            ord.UnitPrice = ordDetail.UnitPrice;
            ord.Quantity = ordDetail.Quantity;
            ord.Discount = ordDetail.Discount;
            ord.Status = ordDetail.Status;
            ord.OrderId = ordDetail.OrderId;
            ord.ProDetailsId = ordDetail.ProDetailsId;
            res = _rep.CreateOrderDetail(ord);
            return res;
        }
    }
}
