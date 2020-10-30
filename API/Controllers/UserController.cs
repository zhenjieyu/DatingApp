using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<   IEnumerable<AppUser>  >GetUsers()
        {
         
          return await _context.Users.ToListAsync(); 

        }
        [HttpGet("{Id}")]
        public ActionResult<AppUser> GetUser(int id )
        {
             return _context.Users.Find(id) ; 

        }
    }
}