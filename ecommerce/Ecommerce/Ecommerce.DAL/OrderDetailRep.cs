using Ecommerce.Common.DAL;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL.Models;
using System;
using System.Linq;

namespace Ecommerce.DAL
{
    public class OrderDetailRep : GenericRep<EcommerceContext, OrderDetail>
    {
        public SingleRsp CreateOrderDetail(OrderDetail ordDe)
        {
            var res = new SingleRsp();

            using (var context = new EcommerceContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.OrderDetail.Add(ordDe);

                        //update unitsInStock of product detail
                        var qty = ordDe.Quantity;

                        ProductDetails proDe = Context.ProductDetails.Where(p => p.ProDetailsId == ordDe.ProDetailsId).FirstOrDefault();
                        proDe.UnitsInStock -= qty; 
                        var g = context.ProductDetails.Update(proDe);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
    }
}
