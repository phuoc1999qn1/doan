using Ecommerce.Common.DAL;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.DAL
{
    public class UsersRep : GenericRep<EcommerceContext, Users>
    {
        //authentication
        public object Authenticate(string email)
        {
            var temp = Context.Users
                        .Where(x => x.Email == email)
                        .Select(u => new
                        {
                            u.UserId,
                        }).ToList();
            var res = (temp.Count == 0) ? null : new { token = generateJwtToken(email)};
            return res;
        }

        // get user
        public object LoadUsers(string email)
        {
            var res = Context.Users
                      .Where(x => x.Email == email)
                        .Select(u => new
                        {
                            u.UserId,
                            u.Email,
                            u.FullName,
                            u.PhoneNumber,
                            u.Address,
                            u.RoleId
                        }).ToList();
            return res;
        }


        //load hash pw

        public object HashPW(string email)
        {
            var res = Context.Users
                     .Where(x => x.Email == email)
                       .Select(u => u.Password).ToList();
            return res;
        }

        //registration
        public SingleRsp CreateUser(Users users)
        {
            var res = new SingleRsp();
            using (var context = new EcommerceContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var t = context.Users.Add(users);
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


        public Users UpdateUser(Users users)
        {
            Users u = new Users();
            var cnn = (SqlConnection)Context.Database.GetDbConnection();
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            try
            {
                string sql = "UPDATE [Users] SET [Email] = '" + users.Email
                    + "', [FullName] = N'" + users.FullName 
                    + "', [PhoneNumber] = '" + users.PhoneNumber
                    + "' WHERE UserId = " + users.UserId + ";";
                sql = sql + " SELECT *  FROM Users  WHERE UserId = " + users.UserId.ToString();
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
                        u = new Users
                        {
                            Email = row["Email"].ToString(),
                            FullName = row["FullName"].ToString() ,
                            PhoneNumber = row["PhoneNumber"].ToString(),
                            Address = row["Address"].ToString() 
                        };                                                             
                    }
                }

            }
            catch (Exception)
            {
                u = null;
            }
            return u;
        }

        public Users UpdateAddress(Users users)
        {
            Users u = new Users();
            var cnn = (SqlConnection)Context.Database.GetDbConnection();
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            try
            {
                string sql = "UPDATE [Users] SET [Address] = N'" + users.Address
                    + "' WHERE UserId = " + users.UserId + ";";
                sql = sql + " SELECT *  FROM Users  WHERE UserId = " + users.UserId.ToString();
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
                        u = new Users
                        {
                            Address = row["Address"].ToString()
                        };
                    }
                }

            }
            catch (Exception)
            {
                u = null;
            }
            return u;
        }

        public Users UpdatePassword(Users users)
        {
            Users u = new Users();
            var cnn = (SqlConnection)Context.Database.GetDbConnection();
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            try
            {
                string sql = "UPDATE [Users] SET [Password] = '" + users.Password
                    + "' WHERE UserId = " + users.UserId + ";";
                sql = sql + " SELECT *  FROM Users  WHERE UserId = " + users.UserId.ToString();
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
                        u = new Users
                        {
                            UserId = (int)row["UserId"]
                        };
                    }
                }

            }
            catch (Exception)
            {
                u = null;
            }
            return u;
        }


        private string generateJwtToken(string email)
        {
            // generate token that is valid for 5 minutes
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("this is super superrrrrrrrrrrrr sercretkey");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("email", email) }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
