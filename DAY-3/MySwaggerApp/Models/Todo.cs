using System.ComponentModel.DataAnnotations.Schema;
[Table("todos")] 
public class Todo
{
      [Column("id")]
    public int Id { get; set; }   
    [Column("title")]      
    public string Title { get; set; }   
    [Column("priority")]
    public int Priority { get; set; }   
    [Column("deadline")]
    public DateTime Deadline { get; set; }
     [Column("userid")]
    public int userId { get; set; } 

}
