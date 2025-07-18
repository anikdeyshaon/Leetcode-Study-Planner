
using LeetcodeStudyPlanner.Controllers;
using LeetcodeStudyPlanner.Data;
using LeetcodeStudyPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace LeetcodeStudyPlanner.Tests
{
    public class ProblemsControllerTests
    {
        private PlannerDbContext _context;

        public ProblemsControllerTests()
        {
            var options = new DbContextOptionsBuilder<PlannerDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new PlannerDbContext(options);
        }

        [Fact]
        public async Task GetProblems_ReturnsAllProblems()
        {
            // Arrange
            _context.Problems.Add(new Problem { Id = 1, Name = "Problem 1", Url = "http://example.com/1", Difficulty = "Easy" });
            _context.Problems.Add(new Problem { Id = 2, Name = "Problem 2", Url = "http://example.com/2", Difficulty = "Medium" });
            await _context.SaveChangesAsync();

            var controller = new ProblemsController(_context);

            // Act
            var result = await controller.GetProblems();

            // Assert
            var problems = Assert.IsType<List<Problem>>(result.Value);
            Assert.Equal(2, problems.Count);
        }

        [Fact]
        public async Task GetProblem_ReturnsProblem_WhenProblemExists()
        {
            // Arrange
            _context.Problems.Add(new Problem { Id = 1, Name = "Problem 1", Url = "http://example.com/1", Difficulty = "Easy" });
            await _context.SaveChangesAsync();

            var controller = new ProblemsController(_context);

            // Act
            var result = await controller.GetProblem(1);

            // Assert
            var problem = Assert.IsType<Problem>(result.Value);
            Assert.Equal(1, problem.Id);
        }

        [Fact]
        public async Task PostProblem_CreatesProblem()
        {
            // Arrange
            var newProblem = new Problem { Name = "New Problem", Url = "http://example.com/new", Difficulty = "Hard" };
            var controller = new ProblemsController(_context);

            // Act
            var result = await controller.PostProblem(newProblem);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var problem = Assert.IsType<Problem>(createdAtActionResult.Value);
            Assert.Equal("New Problem", problem.Name);
            Assert.Equal(1, await _context.Problems.CountAsync());
        }

        [Fact]
        public async Task PutProblem_UpdatesProblem()
        {
            // Arrange
            _context.Problems.Add(new Problem { Id = 1, Name = "Original Name", Url = "http://example.com/1", Difficulty = "Easy" });
            await _context.SaveChangesAsync();

            var problem = await _context.Problems.FindAsync(1);
            Assert.NotNull(problem);

            problem.Name = "Updated Name";
            var controller = new ProblemsController(_context);

            // Act
            var result = await controller.PutProblem(1, problem);

            // Assert
            Assert.IsType<NoContentResult>(result);
            var updatedProblem = await _context.Problems.FindAsync(1);
            Assert.Equal("Updated Name", updatedProblem.Name);
        }

        [Fact]
        public async Task DeleteProblem_DeletesProblem()
        {
            // Arrange
            _context.Problems.Add(new Problem { Id = 1, Name = "Problem to Delete", Url = "http://example.com/delete", Difficulty = "Easy" });
            await _context.SaveChangesAsync();

            var controller = new ProblemsController(_context);

            // Act
            var result = await controller.DeleteProblem(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
            Assert.Equal(0, await _context.Problems.CountAsync());
        }
    }
}
