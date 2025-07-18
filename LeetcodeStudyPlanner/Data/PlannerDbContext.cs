
using LeetcodeStudyPlanner.Models;
using Microsoft.EntityFrameworkCore;

namespace LeetcodeStudyPlanner.Data;

public class PlannerDbContext : DbContext
{
    public PlannerDbContext(DbContextOptions<PlannerDbContext> options) : base(options)
    {
    }

    public DbSet<Problem> Problems { get; set; }
}
