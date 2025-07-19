# Leetcode Study Planner

A comprehensive web application designed to help junior software engineers track their progress on programming problems from various platforms like LeetCode, InterviewBit, HackerRank, etc. The core feature is a spaced repetition system that schedules future review dates for each problem solved, helping to reinforce learning and memory retention.

## 🚀 Features

### Core Functionality
- **CRUD Operations**: Create, Read, Update, and Delete programming problems
- **Spaced Repetition System**: Automatically calculates review dates (+3, +7, +14, +30 days)
- **Difficulty Tracking**: Color-coded difficulty levels (Easy, Normal, Hard)
- **External Linking**: Direct links to problem URLs that open in new tabs
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features
- **Modern UI/UX**: Clean, intuitive interface with loading states and notifications
- **Real-time Updates**: Asynchronous API calls without page reloads
- **Cross-browser Compatibility**: Tested on Chrome, Firefox, Safari, and Edge
- **RESTful API**: Full CRUD endpoints with proper HTTP status codes

## 🛠️ Technology Stack

### Backend
- **ASP.NET Core 9.0**: Modern, cross-platform web framework
- **Entity Framework Core**: Object-relational mapping (ORM)
- **SQL Server**: Relational database
- **CORS**: Cross-Origin Resource Sharing enabled

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Vanilla JS with async/await
- **Fetch API**: Modern HTTP client

### Testing
- **xUnit**: Unit testing framework
- **Entity Framework In-Memory Database**: For testing

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or SQL Server Express)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Getting Started

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Leetcode Study Planner"
   ```

2. **Configure the database connection**
   - Open `LeetcodeStudyPlanner/appsettings.json`
   - Update the `DefaultConnection` string with your SQL Server details:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=LeetcodePlanner;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

3. **Run database migrations**
   ```bash
   cd LeetcodeStudyPlanner
   dotnet ef database update
   ```

4. **Start the backend application**
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5214`

5. **Open the frontend**
   - Open `index.html` in your web browser
   - Or serve it using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

### Option 2: Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: `http://localhost:8080`
   - API: `http://localhost:8080/api/problems`

### Option 3: Azure Deployment

1. **Deploy to Azure App Service**
   ```bash
   # Install Azure CLI
   az login
   az webapp up --name leetcode-planner --resource-group myResourceGroup --runtime "DOTNETCORE:9.0"
   ```

## 🧪 Testing

### Run Unit Tests
```bash
cd LeetcodeStudyPlanner.Tests
dotnet test
```

### API Testing
The application includes a comprehensive test suite covering all CRUD operations:
- GET `/api/problems` - Retrieve all problems
- GET `/api/problems/{id}` - Retrieve a specific problem
- POST `/api/problems` - Create a new problem
- PUT `/api/problems/{id}` - Update an existing problem
- DELETE `/api/problems/{id}` - Delete a problem

### Browser Compatibility
Open `browser-test.html` in different browsers to verify compatibility.

## 📁 Project Structure

```
Leetcode Study Planner/
├── LeetcodeStudyPlanner/           # Backend ASP.NET Core application
│   ├── Controllers/                # API controllers
│   ├── Data/                      # Entity Framework context
│   ├── Models/                    # Data models
│   ├── Migrations/                # Database migrations
│   └── Program.cs                 # Application entry point
├── LeetcodeStudyPlanner.Tests/    # Unit tests
├── index.html                     # Main frontend page
├── style.css                      # Frontend styles
├── script.js                      # Frontend JavaScript
├── Dockerfile                     # Docker configuration
├── docker-compose.yml             # Docker Compose setup
└── README.md                      # This file
```

## 🔧 Configuration

### Environment Variables
- `ASPNETCORE_ENVIRONMENT`: Set to `Production` for production deployment
- `ConnectionStrings__DefaultConnection`: Database connection string

### CORS Configuration
The application is configured to allow requests from any origin in development. For production, update the CORS policy in `Program.cs`.

## 🚀 Deployment Options

### 1. Azure App Service
- Supports .NET 9.0 out of the box
- Integrated with Azure SQL Database
- Easy scaling and monitoring

### 2. Docker Containers
- Deploy to any container platform (Azure Container Instances, AWS ECS, etc.)
- Consistent environment across development and production

### 3. IIS (Windows Server)
- Traditional Windows hosting
- Requires .NET 9.0 Runtime
- SQL Server database

### 4. Linux with Nginx
- Cross-platform deployment
- Reverse proxy with Nginx
- PostgreSQL or MySQL database (requires EF Core provider change)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information about your problem
3. Include your environment details (OS, .NET version, browser, etc.)

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Problem categories and tags
- [ ] Progress tracking and statistics
- [ ] Export/import functionality
- [ ] Mobile app (React Native/Flutter)
- [ ] Integration with LeetCode API
- [ ] Study reminders and notifications

---

**Happy Coding! 🚀** 