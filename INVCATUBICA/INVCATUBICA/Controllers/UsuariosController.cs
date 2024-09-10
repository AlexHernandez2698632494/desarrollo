using INVCATUBICA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UsuariosController : ControllerBase
{
    private readonly LogisticaContext _context;

    public UsuariosController(LogisticaContext context)
    {
        _context = context;
    }

    // GET: api/Usuarios
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuarios>>> GetUsuarios()
    {
        return await _context.Usuarios.ToListAsync();
    }

    // POST: api/Usuarios
    [HttpPost]
    public async Task<ActionResult<Usuarios>> PostUsuario(Usuarios usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUsuarios), new { id = usuario.ID }, usuario);
    }
}
