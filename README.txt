1. Plane spotter application consists of two major solutions. UI and API.
2. UI is built using React JS
3. Api is .Net core Api
4. Migrations are written in order to create table. But please create a DB in your SQL server using the name "AircraftTracker".
    Connection string Example.
"ConnectionStrings": {
    "DefaultConnection": "Server=Your Server;Initial Catalog=AircraftTracker;Integrated Security=true;TrustServerCertificate=true"
  },

5. First run the Api solution, then the UI will be loaded based on the api results.
6. Used SOLID, SOC ,DRY as principles / DI, Repository as design patterns.
7. Added an API KEY based authentication to access the Api End points. Key is added in the appsettings.json file in API solution. Also, hardcoded in React solution.
So, running apis using swagger will return an unauthorized error. Use React application as frontend.

8. Used two middlewares to authentication and exceptions. Used an extension to extend the functionality of DI container.

8. Added some steps to test the functionality.(Execution steps)
