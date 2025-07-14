using System.ComponentModel.DataAnnotations.Schema;
[Table("users")] 
public class User
{
      [Column("id")]
    public int Id { get; set; }         
     [Column("username")]
    public string Username { get; set; }
     [Column("password")]
    public string Password { get; set; } 
}
