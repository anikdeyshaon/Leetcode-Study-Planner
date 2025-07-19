# Use the official .NET 9.0 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the official .NET 9.0 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy the project files
COPY ["LeetcodeStudyPlanner/LeetcodeStudyPlanner.csproj", "LeetcodeStudyPlanner/"]
COPY ["LeetcodeStudyPlanner.Tests/LeetcodeStudyPlanner.Tests.csproj", "LeetcodeStudyPlanner.Tests/"]

# Restore dependencies
RUN dotnet restore "LeetcodeStudyPlanner/LeetcodeStudyPlanner.csproj"
RUN dotnet restore "LeetcodeStudyPlanner.Tests/LeetcodeStudyPlanner.Tests.csproj"

# Copy the rest of the source code
COPY . .

# Build the application
WORKDIR "/src/LeetcodeStudyPlanner"
RUN dotnet build "LeetcodeStudyPlanner.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "LeetcodeStudyPlanner.csproj" -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Copy static files (HTML, CSS, JS)
COPY index.html .
COPY style.css .
COPY script.js .

ENTRYPOINT ["dotnet", "LeetcodeStudyPlanner.dll"] 