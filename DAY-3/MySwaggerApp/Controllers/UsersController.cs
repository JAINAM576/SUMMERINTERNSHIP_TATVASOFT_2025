using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
 private readonly IConfiguration _config;

    public UsersController(IUserService userService,IConfiguration config)
    {
        _userService = userService;
         _config = config;
    }

    [HttpGet]
    public IActionResult GetAllUsers()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _userService.GetById(id);
        if (user == null)
            return NotFound();

        return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        _userService.Add(user);
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }
    [HttpPost("register")]
    public IActionResult Register(User user)
    {
         var existingUser = _userService.GetAll().FirstOrDefault(u => u.Username == user.Username);

    if (existingUser != null)
    {
        return Conflict(new { message = "Username already exists" });
    }
        _userService.Add(user);
       return Ok(new { message = "User registered" });

    }
    [HttpPost("login")]
    public IActionResult Login(User loginUser)
    {
        var user = _userService.GetAll()
            .FirstOrDefault(u => u.Username == loginUser.Username && u.Password == loginUser.Password);

        if (user == null)
            return Unauthorized("Invalid credentials");

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

        private string GenerateJwtToken(User user)
    {
        var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(0.01),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    [Authorize]
[HttpGet("secure-data")]
public IActionResult GetSecureData()
{
    return Ok(new { message = "You are authenticated!" });
}

}
