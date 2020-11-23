using Ecommerce.Common.DAL;
using Ecommerce.DAL.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data;
using System.Linq;

namespace Ecommerce.DAL
{
    public class OrderRep : GenericRep<EcommerceContext, Order>
    {
        public Order CreateOrder(Order ord)
        {
            Order o = new Order();
            var cnn = (SqlConnection)Context.Database.GetDbConnection();
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            try
            {
                string date = DateTime.Now.Month.ToString() + '/' + DateTime.Now.Day.ToString() + '/' + DateTime.Now.Year.ToString();
                string sql = "INSERT INTO [Order]([UserId], [OrderDate], [Address], [Country]) " +
                             "VALUES (" + ord.UserId + ", '" + date + "', N'" + ord.Address + "', '" + ord.Country + "');";
                sql = sql + " SELECT * FROM [Order] WHERE OrderID = SCOPE_IDENTITY() ";
                SqlDataAdapter da = new SqlDataAdapter();
                DataSet ds = new DataSet();
                var cmd = cnn.CreateCommand();
                cmd.CommandText = sql;
                cmd.CommandType = CommandType.Text;
                da.SelectCommand = cmd;
                da.Fill(ds);
                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        o = new Order
                        {
                            OrderId = (int)row["OrderId"]
                        };
                    }
                }

            }
            catch (Exception)
            {
                o = null;
            }
            return o;
        }


        public object showHistoryOrder(int userId)
        {
            // Mã đơn hàng orderid	Ngày mua [OrderDate]	Sản phẩm prodetailid	Tổng tiền unitprice * quantity * (1-0)	Trạng thái đơn hàng status
            var res = Context.Order
                .Join(Context.OrderDetail, a => a.OrderId, b => b.OrderId, (a, b) => new
                {
                    a.OrderId,
                    a.UserId,
                    a.OrderDate,
                    b.ProDetailsId,
                    b.UnitPrice,
                    b.Quantity,
                    b.Discount,
                    b.Status
                })
                .Join(Context.ProductDetails, a => a.ProDetailsId, b => b.ProDetailsId, (a, b) => new
                {
                    a.OrderId,
                    a.UserId,
                    a.OrderDate,
                    b.ProName,
                    TongTien = a.Quantity * (a.UnitPrice) * (1 - (decimal)a.Discount),
                    a.Status
                }).Where(u => u.UserId == userId).OrderByDescending(u=>u.OrderId).ToList();

            return res;
        }
    }
}
