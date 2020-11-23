using Ecommerce.Common.BLL;
using Ecommerce.Common.Req;
using Ecommerce.Common.Rsp;
using Ecommerce.DAL;
using Ecommerce.DAL.Models;

namespace Ecommerce.BLL
{
    public class UsersSvc : GenericSvc<UsersRep, Users>
    {
        public object Authenticate(string email)
        {
            return _rep.Authenticate(email);
        }

        public object LoadUsers(string email)
        {
            return _rep.LoadUsers(email);
        }

        public object HashPW(string email)
        {
            return _rep.HashPW(email);

        }
        public SingleRsp CreateUser(UsersReq use)
        {
            var res = new SingleRsp();
            Users users = new Users();
            users.Email = use.Email;
            users.Password = use.Password;
            users.FullName = use.FullName;
            users.PhoneNumber = use.PhoneNumber;
            users.Address = use.Address;
            users.RoleId = use.RoleId;

            res = _rep.CreateUser(users);
            return res;
        }

        public Users UpdateUser(UsersReq use)
        {
            Users users = new Users();
            users.UserId = use.UserId;
            users.Email = use.Email;
            users.FullName = use.FullName;
            users.PhoneNumber = use.PhoneNumber;
            return _rep.UpdateUser(users);
        }

        public Users UpdateAddress(UsersReq use)
        {
            Users users = new Users();
            users.UserId = use.UserId;
            users.Address = use.Address;
            return _rep.UpdateAddress(users);
        }
        public Users UpdatePassword(UsersReq use)
        {
            Users users = new Users();
            users.UserId = use.UserId;
            users.Password = use.Password;
            return _rep.UpdatePassword(users);
        }
    }
}
