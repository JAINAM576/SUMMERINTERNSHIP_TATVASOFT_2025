using System.Collections.Generic;

public interface IUserService
{
    IEnumerable<User> GetAll();
    User GetById(int id);
    void Add(User user);
}
