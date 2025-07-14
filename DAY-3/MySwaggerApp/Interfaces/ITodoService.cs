using System.Collections.Generic;

public interface ITodoService
{
    IEnumerable<Todo> GetAll();
    Todo GetById(int id);
    void Add(Todo todo);
    void edit(int id,Todo newTodo);
    //   void delete(int id);
    IEnumerable<Todo> GetAllTodoForSpecificUser(int userid);

}
