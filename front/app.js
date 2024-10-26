// app.js

const templates = 
{
  login: `
    <div id="loginPage">
      <h2>Login</h2>
      <form id="loginForm">
            <label for="username">Username:</label>
                <input type="text" id="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <button type="submit">Login</button>
      </form>
    </div>
  `,
  home: `
    <div id="homePage">
      <h2>Home Page</h2>
      <p>Welcome! You’re logged in.</p>
      <button id="logoutButton">Logout</button>
    </div>
  `
};
console.log('app is connected!');
document.write('<p>hello word</>p');
