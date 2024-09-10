using INVCATUBICA.Models;
using Microsoft.EntityFrameworkCore;

public class LogisticaContext : DbContext
{
    public LogisticaContext(DbContextOptions<LogisticaContext> options) : base(options) { }

    public DbSet<INVCATUBICACION> INVCATUBICA { get; set; }
    public DbSet<Usuarios> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<INVCATUBICACION>().HasKey(c => new { c.INVBODEGA, c.INVUBICA });
    }
}
