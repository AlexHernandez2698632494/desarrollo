using INVCATUBICA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class INVCATUBICAController : ControllerBase
{
    private readonly LogisticaContext _context;

    public INVCATUBICAController(LogisticaContext context)
    {
        _context = context;
    }

    // GET: api/INVCATUBICA
    [HttpGet]
    public async Task<ActionResult<IEnumerable<INVCATUBICACION>>> GetINVCATUBICA()
    {
        return await _context.INVCATUBICA.ToListAsync();
    }

    // POST: api/INVCATUBICA
    [HttpPost]
    public async Task<ActionResult<INVCATUBICACION>> PostINVCATUBICA(INVCATUBICACION invcatubica)
    {
        _context.INVCATUBICA.Add(invcatubica);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetINVCATUBICA), new { id = invcatubica.INVBODEGA }, invcatubica);
    }
}
