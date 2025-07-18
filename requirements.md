# Project Requirements: Leetcode Study Planner with Spaced Repetition

## 1. Project Overview

The "Leetcode Study Planner" is a CRUD (Create, Read, Update, Delete) web application designed to help junior software engineers track their progress on programming problems from various platforms like LeetCode, InterviewBit, HackerRank, etc. The core feature is a spaced repetition system that schedules future review dates for each problem solved, helping to reinforce learning and memory retention.

## 2. Core Features & Functionality

### 2.1. Problem Management (CRUD)

* **Create (C):** Users must be able to add a new programming problem to the planner.
* **Read (R):** Users must be able to view all entered problems in a clear, organized list or table.
* **Update (U):** Users must be able to edit the details of an existing problem and update its status.
* **Delete (D):** Users must be able to remove a problem from the planner.

### 2.2. Spaced Repetition System

* The system will track up to **five solving dates** for each problem.
* When a problem is first entered with its initial solve date, the application should suggest or pre-fill the next four review dates based on a standard spaced repetition interval (e.g., +3 days, +7 days, +14 days, +30 days). The user should be able to override these suggested dates.
* The user should be able to mark each of the five date slots as "completed".

### 2.3. Difficulty Indicator

* Users must be able to assign a difficulty status to each problem, which will be visually represented by a color code.
    * **Green:** Indicates the problem was "Easy". This might visually deprioritize it for future study.
    * **Red:** Indicates the problem was "Hard". This highlights it for focused review.
    * **Default (No Color):** Indicates a "Normal" difficulty problem.
* This status should be easily updatable at any time.

### 2.4. External Problem Linking

* Each problem entry must have a URL field.
* When a user clicks on the problem's name or a dedicated link icon, the URL should open in a **new browser tab** (`target="_blank"`). This prevents the user from navigating away from the planner.

## 3. Frontend Requirements (HTML, CSS, JavaScript)

### 3.1. Main View (Problem List)

* The main page will display all problems in a table or a grid-based list.
* The table/list should have the following columns/fields for each entry:
    1.  **Problem Name:** The name of the problem.
    2.  **Problem Link:** The clickable URL.
    3.  **Status/Color:** A visual indicator for difficulty (e.g., a colored dot or row background).
    4.  **Date 1 (Initial Solve):** The date the problem was first solved.
    5.  **Date 2 (Review):** The first scheduled review date.
    6.  **Date 3 (Review):** The second scheduled review date.
    7.  **Date 4 (Review):** The third scheduled review date.
    8.  **Date 5 (Review):** The final scheduled review date.
    9.  **Actions:** Buttons/icons for "Edit" and "Delete".

### 3.2. Add/Edit Form

* A modal dialog or a separate page will contain a form for adding a new problem or editing an existing one.
* **Form Fields:**
    * `Problem Name`: Text input.
    * `Problem URL`: URL input.
    * `Initial Solve Date`: Date picker.
    * `Difficulty`: A dropdown or radio buttons (`Easy`, `Normal`, `Hard`).
* The form should have "Save" and "Cancel" buttons.

### 3.3. User Interaction

* **Color Coding:** JavaScript will be used to dynamically apply CSS classes to table rows or cells based on the problem's difficulty status fetched from the backend.
* **Asynchronous Calls:** All CRUD operations should be performed asynchronously using `fetch()` to communicate with the backend API without requiring a full page reload.

## 4. Backend Requirements (ASP.NET Core, Entity Framework)

### 4.1. API Endpoints

A RESTful API will be created with the following endpoints:

* `GET /api/problems`: Retrieves a list of all problems.
* `GET /api/problems/{id}`: Retrieves a single problem by its ID.
* `POST /api/problems`: Creates a new problem. The request body will contain the new problem's data.
* `PUT /api/problems/{id}`: Updates an existing problem. The request body will contain the updated data.
* `DELETE /api/problems/{id}`: Deletes a problem by its ID.

### 4.2. Database Model (Entity Framework)

An entity named `Problem` will be defined with the following properties:

```csharp
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
```

### 4.3. Business Logic

* The backend will handle all validation (e.g., ensuring URL is valid, name is not empty).
* The logic for calculating suggested spaced repetition dates can be handled on the backend when a new problem is created, or on the frontend. For simplicity, initial logic can be on the frontend with backend validation.

## 5. Non-Functional Requirements

* **Usability:** The interface should be clean, intuitive, and easy to navigate.
* **Responsiveness:** The layout should adapt well to various screen sizes, including desktop and mobile devices.
* **Performance:** The application should load quickly and respond promptly to user actions.
