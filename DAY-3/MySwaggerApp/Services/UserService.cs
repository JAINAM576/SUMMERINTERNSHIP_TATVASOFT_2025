// using System.Collections.Generic;
// using System.Linq;

// public class UserService : IUserService
// {
//     private readonly List<User> _users = new();  
//     private int _nextId = 1;               

//     public IEnumerable<User> GetAll() => _users;

//     public User GetById(int id) => _users.FirstOrDefault(u => u.Id == id);

//     public void Add(User user)
//     {
//         user.Id = _nextId++; 
//         _users.Add(user);
//     }
// }

using System.Collections.Generic;
using System.Linq;
public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<User> GetAll() => _context.Users.ToList();

    public User GetById(int id) => _context.Users.Find(id); 

    public void Add(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }
}