

 async function loadPage(page) 
 {
     const content = document.getElementById('content');
     try 
     {
         const url = `pages/${page}.html`;
         const response = await fetch(url);

         if (!response.ok) throw new Error('Page not found');

         const html = await response.text();
         content.innerHTML = html;
         console.log('content.innerHTML', content.innerHTML);

         loadCSS(`${page}.css`);

         if (page === 'login') 
             setupLoginPage();
         else if (page === 'profile') 
             setupProfilePage();

         else if (page === 'signup') 
             setupSignupPage();
     } 
     catch (error) 
     {
         console.error('Error loading page:', error);
         content.innerHTML = "<p>Page not found.</p>";
     }
 }

 function loadCSS(filename) 
 {
     const existingLink = document.querySelector('link[data-page-css]');
     if (existingLink) existingLink.remove();

     const link = document.createElement("link");
     link.rel = "stylesheet";
     link.href = `styles/${filename}`;
     link.setAttribute('data-page-css', 'true');
     document.head.appendChild(link);
 }

 function setupLoginPage() {
     const form = document.querySelector('.form');
     if (form) {
         form.addEventListener('submit', (event) => {
             event.preventDefault();
             console.log('Login form submitted');

             const username = document.getElementById('username').value;
             const password = document.getElementById('password').value;
             console.log(`Username: ${username}, Password: ${password}`);

             if (username === 'user' && password === 'pass') 
             {
                 console.log('Credentials match');
                 loadPage('profile'); // Navigate to profile on successful login
             } 
             else 
             {
                 console.log('Invalid credentials');
                 alert('Invalid username or password');
             }
         });
     }
 }

 function setupProfilePage() {
     console.log("Profile page loaded");
     alert("good trip");
 }


 function setupSignupPage() {

     const loginForm = document.getElementById("login-form");
     const signupForm = document.getElementById("signup-form");
     const signupLink = document.getElementById("signup-link");
     const title = document.querySelector(".cart .title");

     console.log('loginForm:', loginForm);
     console.log('signupForm:', signupForm);
     console.log('signupLink:', signupLink);
     console.log('title:', title);

     if (!loginForm || !signupForm || !signupLink || !title) {
         console.error("One or more elements not found");
         return;
     }

     signupLink.addEventListener("click", (event) => {
         event.preventDefault(); // Prevent link from navigating

         loginForm.classList.add("hidden");
         signupForm.classList.remove("hidden");

         title.textContent = "Sign Up";
     });
 }

 document.addEventListener('DOMContentLoaded', () => {
     loadPage('login');
 });  



