// using System.Collections.Generic;
// using System.Linq;

// public class TodoService : ITodoService
// {
//     private readonly List<Todo> _todos = new(); 
//     private int _nextId = 1; 
//     public IEnumerable<Todo> GetAll() => _todos;

//     public IEnumerable<Todo> GetAllTodoForSpecificUser(int userid) {return _todos.Where(t => t.userId == userid);}
    

//     public Todo GetById(int id) => _todos.FirstOrDefault(t => t.Id == id);
    
//     public void Add(Todo todo)
//     {
//         todo.Id = _nextId++;
//         _todos.Add(todo);
//     }
//     public void edit(int id,Todo newtodo){
//          Todo edittodo=this.GetById(id);
//         if(edittodo!=null){
//             edittodo.Title=newtodo.Title;
//             edittodo.Priority=newtodo.Priority;
//             edittodo.Deadline=newtodo.Deadline;
//         }
//     }
// }

public class TodoService : ITodoService
{
    private readonly AppDbContext _context;

    public TodoService(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Todo> GetAll() => _context.Todos.ToList();

    public IEnumerable<Todo> GetAllTodoForSpecificUser(int userId) =>
        _context.Todos.Where(t => t.userId == userId).ToList();

    public Todo GetById(int id) => _context.Todos.Find(id);

    public void Add(Todo todo)
    {
        _context.Todos.Add(todo);
        _context.SaveChanges();
    }

    public void edit(int id, Todo newTodo)
    {
        var todo = _context.Todos.Find(id);
        if (todo != null)
        {
            todo.Title = newTodo.Title;
            todo.Priority = newTodo.Priority;
            todo.Deadline = newTodo.Deadline;
            _context.SaveChanges();
        }
    }
//    public void delete(int id)
// {
//     var todo = _context.Todos.Find(id);
//     if (todo != null)
//     {
//         _context.Todos.Remove(todo);
//         _context.SaveChanges();
//     }
// }

}
