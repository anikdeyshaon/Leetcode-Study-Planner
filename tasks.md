
# Leetcode Study Planner: Implementation Plan

This document outlines the development tasks required to build the Leetcode Study Planner application. Tasks are organized by phase and can be checked off as they are completed.

---

## Phase 1: Backend Setup (ASP.NET Core & Entity Framework)

- [ ] **1.1: Initialize Project:** Create a new ASP.NET Core Web API project.
- [ ] **1.2: Define Model:** Create the `Problem.cs` class in a `Models` folder as defined in the requirements.
- [ ] **1.3: Install EF Core:** Add NuGet packages for Entity Framework Core (`Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.EntityFrameworkCore.Tools`).
- [ ] **1.4: Create DbContext:** Create a `PlannerDbContext.cs` class that inherits from `DbContext` and includes a `DbSet<Problem>`.
- [ ] **1.5: Configure Database:** Configure the database connection string in `appsettings.json`.
- [ ] **1.6: Register Services:** Register the `DbContext` in `Program.cs` (or `Startup.cs`).
- [ ] **1.7: Create Initial Migration:** Run `dotnet ef migrations add InitialCreate` in the terminal.
- [ ] **1.8: Apply Migration:** Run `dotnet ef database update` to create the database schema.
- [ ] **1.9: Configure CORS:** Set up a CORS policy in `Program.cs` to allow requests from the frontend.

---

## Phase 2: Backend API Development (CRUD Endpoints)

- [ ] **2.1: Create Controller:** Create a new `ProblemsController.cs` API controller.
- [ ] **2.2: Implement GET All:** Create an endpoint `GET /api/problems` to fetch all problems.
- [ ] **2.3: Implement POST:** Create an endpoint `POST /api/problems` to add a new problem.
- [ ] **2.4: Implement PUT:** Create an endpoint `PUT /api/problems/{id}` to update an existing problem.
- [ ] **2.5: Implement DELETE:** Create an endpoint `DELETE /api/problems/{id}` to delete a problem.
- [ ] **2.6: Test Endpoints:** Use Swagger or a tool like Postman to test all five endpoints thoroughly.

---

## Phase 3: Frontend Structure & Styling (HTML/CSS)

- [ ] **3.1: Create HTML File:** Create the main `index.html` file.
- [ ] **3.2: Create CSS File:** Create a `style.css` file and link it to `index.html`.
- [ ] **3.3: Basic HTML Structure:** Add the basic HTML boilerplate, including a title and a container div.
- [ ] **3.4: Create Problem Table:** Add a `<table>` element with a `<thead>` for headers (Problem, Link, Dates, Actions) and an empty `<tbody>`.
- [ ] **3.5: Create "Add" Button:** Add a button with an ID like `show-add-form-btn`.
- [ ] **3.6: Create Add/Edit Form Modal:**
    - [ ] Build the form structure inside a `div` that will act as a modal (initially hidden with CSS `display: none;`).
    - [ ] Add input fields for Name, URL, Initial Solve Date, and a `select` for Difficulty.
    - [ ] Add "Save" and "Cancel" buttons to the form.
- [ ] **3.7: Basic CSS Styling:**
    - [ ] Style the main layout, table, and buttons for a clean look.
    - [ ] Style the form modal (e.g., centered, with a backdrop overlay).
- [ ] **3.8: Add Responsive Design:** Use media queries to ensure the layout works on smaller screens.

---

## Phase 4: Frontend Logic & Interactivity (JavaScript)

- [ ] **4.1: Create JS File:** Create a `script.js` file and link it at the bottom of `index.html`.
- [ ] **4.2: Fetch and Display Problems:**
    - [ ] Write an asynchronous function `fetchProblems()` that calls the `GET /api/problems` endpoint.
    - [ ] Write a function `renderProblems(problems)` that clears the table body and populates it with data. Each row should have `data-id` attribute.
    - [ ] Call `fetchProblems()` when the page loads.
- [ ] **4.3: Implement "Add New Problem":**
    - [ ] Add an event listener to the "Add" button to show the form modal.
    - [ ] Add an event listener to the form's "Save" button to handle form submission.
    - [ ] Inside the handler, create a problem object from form values and send it via a `POST` request.
    - [ ] On success, hide the modal, clear the form, and refresh the problem list by calling `fetchProblems()`.
- [ ] **4.4: Implement "Delete Problem":**
    - [ ] Use event delegation on the table body to listen for clicks on "Delete" buttons.
    - [ ] Get the problem ID from the row's `data-id`.
    - [ ] Send a `DELETE` request to `/api/problems/{id}`.
    - [ ] On success, remove the row from the DOM directly to avoid a full refresh.
- [ ] **4.5: Implement "Edit Problem":**
    - [ ] Use event delegation to listen for clicks on "Edit" buttons.
    - [ ] Fetch the single problem's data using `GET /api/problems/{id}`.
    - [ ] Populate the form with the fetched data and show the modal.
    - [ ] Change the form's state to "edit mode" (e.g., by storing the ID).
    - [ ] Modify the form's "Save" handler: if in "edit mode", send a `PUT` request instead of a `POST`.
    - [ ] On success, hide the modal and refresh the list.

---

## Phase 5: Advanced Features & Refinements

- [ ] **5.1: Implement Spaced Repetition Logic:**
    - [ ] In the JavaScript "Save" function, when creating a new problem, calculate the next 4 review dates based on the initial solve date.
    - [ ] Add these dates to the object before sending it to the backend.
- [ ] **5.2: Implement Color Coding:**
    - [ ] In the `renderProblems` function, add a class to each `<tr>` based on the problem's difficulty property (e.g., `class="problem-easy"`).
    - [ ] Add CSS rules for `.problem-easy` (e.g., `background-color: #d4edda;`) and `.problem-hard` (e.g., `background-color: #f8d7da;`).
- [ ] **5.3: Add Link Functionality:** Ensure the problem link in the table opens in a new tab (`target="_blank"`).
- [ ] **5.4: UI/UX Polish:**
    - [ ] Add simple loading states (e.g., disable buttons during API calls).
    - [ ] Create a simple notification system (e.g., a small bar that appears on success/error).
    - [ ] Improve form validation on the frontend (e.g., required fields).

---

## Phase 6: Final Testing & Deployment

- [x] **6.1: End-to-End Testing:** Thoroughly test every feature of the application.
- [x] **6.2: Cross-Browser Testing:** Check functionality and appearance in Chrome, Firefox, and Safari.
- [x] **6.3: Prepare for Deployment:** Research deployment options for an ASP.NET backend and a static frontend (e.g., Azure App Service, IIS).
- [x] **6.4: Write README:** Update your project's `README.md` with instructions on how to set up and run the project locally.
