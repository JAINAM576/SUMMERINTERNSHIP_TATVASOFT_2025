using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public IActionResult GetAllTodos()
    {
        var todos = _todoService.GetAll();
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public IActionResult GetTodoById(int id)
    {
        var todo = _todoService.GetById(id);
        if (todo == null)
            return NotFound();

        return Ok(todo);
    }
    [Authorize]
     [HttpGet("user/{userId}")]
    public IActionResult GetTodoByUserId(int userId)
    {
        var todo = _todoService.GetAllTodoForSpecificUser(userId);
        if (todo == null)
            return NotFound();

        return Ok(todo);
    }

    [Authorize]
    [HttpPost]
    public IActionResult CreateTodo(Todo todo)
    {
      todo.Deadline = todo.Deadline.ToUniversalTime();

        _todoService.Add(todo);
        return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
    }

    [Authorize]
    [HttpPost("edit")]
    public IActionResult EditTodo([FromBody]EditTodoRequest request)
    {
        _todoService.edit(request.Id,request.Todo);
      return CreatedAtAction(nameof(GetTodoById), new { id = request.Todo.Id }, request.Todo);

    }
//  [Authorize]
// [HttpDelete("{id}")]
// public IActionResult DeleteTodo(int id)
// {
//     var result = _todoService.delete(id);
    
//     if (!result)
//     {
//         return NotFound($"Todo with id {id} not found.");
//     }

//     return Ok(new { message = "User Deleted" }); 
// }


}
