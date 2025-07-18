
namespace LeetcodeStudyPlanner.Models;

public class Problem
{
    public int Id { get; set; } // Primary Key
    public string Name { get; set; }
    public string Url { get; set; }
    public string Difficulty { get; set; } // e.g., "Easy", "Normal", "Hard"
    public DateTime? Date1 { get; set; }
    public DateTime? Date2 { get; set; }
    public DateTime? Date3 { get; set; }
    public DateTime? Date4 { get; set; }
    public DateTime? Date5 { get; set; }
}
