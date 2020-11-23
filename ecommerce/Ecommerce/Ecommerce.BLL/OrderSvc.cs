using Ecommerce.Common.BLL;
using Ecommerce.Common.Req;
using Ecommerce.DAL;
using Ecommerce.DAL.Models;


namespace Ecommerce.BLL
{
    public class OrderSvc : GenericSvc<OrderRep, Order>
    {

        public Order CreateOrder(OrderReq ord)
        {
            Order o = new Order();
            o.UserId = ord.UserId;
            o.Address = ord.Address;
            o.Country = ord.Country;
            return _rep.CreateOrder(o);
        }

        public object showHistoryOrder(int userId)
        {
            return _rep.showHistoryOrder(userId);

        }
    }
}
