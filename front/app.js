   //
   async function loadPage(page) 
   {
       const content = document.getElementById('content');
       try 
       {
           const url = `pages/${page}.html`;
           const response = await fetch(url);

           if (!response.ok) 
               throw new Error('Page not found');

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
   //
   // function loadCSS(filename) 
   // {
   //     const existingLink = document.querySelector('link[data-page-css]');
   //     if (existingLink) existingLink.remove();
   //
   //     const link = document.createElement("link");
   //     link.rel = "stylesheet";
   //     link.href = `styles/${filename}`;
   //     link.setAttribute('data-page-css', 'true');
   //     document.head.appendChild(link);
   // }
   //

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

   //
   // function setupProfilePage() {
   //     console.log("Profile page loaded");
   //     alert("good trip");
   // }
   //
   //
   // function setupSignupPage() {
   //
   //     const loginForm = document.getElementById("login-form");
   //     const signupForm = document.getElementById("signup-form");
   //     const signupLink = document.getElementById("signup-link");
   //     const title = document.querySelector(".cart .title");
   //
   //     console.log('loginForm:', loginForm);
   //     console.log('signupForm:', signupForm);
   //     console.log('signupLink:', signupLink);
   //     console.log('title:', title);
   //
   //     if (!loginForm || !signupForm || !signupLink || !title) {
   //         console.error("One or more elements not found");
   //         return;
   //     }
   //
   //     signupLink.addEventListener("click", (event) => {
   //         event.preventDefault(); // Prevent link from navigating
   //
   //         loginForm.classList.add("hidden");
   //         signupForm.classList.remove("hidden");
   //
   //         title.textContent = "Sign Up";
   //     });
   // }
   //
   // document.addEventListener('DOMContentLoaded', () => {
   //     loadPage('login');
   // });  
   //



// const updateContent = () => {
//   const content = document.getElementById('content');
//   const hash = window.location.hash.substring(1); // Remove the '#' from the hash
//
//   switch (hash) {
//     case 'home':
//       content.innerHTML = `
//           <h1>Home</h1>
//           <p>Welcome to the home page.</p>
//         `;
//       break;
//     case 'about':
//       content.innerHTML = `
//           <h1>About</h1>
//           <p>Learn more about us on this page.</p>
//         `;
//       break;
//     case 'contact':
//       content.innerHTML = `
//           <h1>Contact</h1>
//           <p>Get in touch with us.</p>
//         `;
//       break;
//   }
// };
//
// // Event listener for hashchange
// window.addEventListener('hashchange', updateContent);
//
//

const carts = {
    login : `
            <div class="login-cart">
                <h2 class="title"> login </h2>
                <form class="form" id="login-form">
                    <div class="input-group">
                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="">

                        <label for="password">password</label>
                        <input type="password" name="password" autocomplete="on" id="password" placeholder="">

                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#" id="forget-passwd">forgot password ?</a>
                        </div>
                    </div>
                    <button class="login">login</button>
                </form>
                <div class="intra">
                    <div class="line"></div>
                    <p class="message">or</p> 
                    <div class="line"></div>
                </div>
                <button class="login">login with 42 intra</button>
            
                <div class="social-icons">
                    <p class="signup"><br/>don't have an account?
                    <a rel="noopener noreferrer" href="#" class="" id="signup-link">sign up</a>
                    </p>
                </div>
            </div>`, 
    register : `
            <div class="register-cart">
                <h2 class="title"> register </h2>
                <form class="form" id="register-form">
                    <div class="input-group" id="reg">

                        <label for="firstname">firstname</label>
                        <input type="text" name="firstname" autocomplete="on" id="firstname" placeholder="">

                        <label for="lastname">lastname</label>
                        <input type="text" name="lastname"  autocomplete="on" id="lastname" placeholder="">

                        <label for="email">email</label>
                        <input type="text" name="email"  autocomplete="on" id="email" placeholder="">

                        <label for="password">password</label>
                        <input type="text" name="password"  autocomplete="on" id="password" placeholder="">

                    </div>
                    <button class="register">register</button>
                </form>
            </div>`, 
    forget_passwd: `
            <div class="forget-cart">
                <h2 class="title"> Forgot Password ?</h2>
                <form class="form" id="forget-form">
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" autocomplete="on" id="email" placeholder="">
                    </div>
                    <button class="login">Submit</button>
                </form>
            </div>`,
    login_42 : ``,
    profile : `
            <div class="profile">
                <h1 class="title"> welcome to ur profile !!</h1>
            </div>`,
};

function renderView(viewName) 
{
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = views[viewName];
}

document.getElementById("content").innerHTML = carts.profile;

document.getElementById("signup-link").addEventListener('click', () => {
    renderView("register");
});

document.getElementById("forget-passwd").addEventListener('click', () => {
    renderView("forget_passwd");
});

document.getElementById("login").addEventListener('click', () => {
    renderView("login");
});

document.getElementById("login_42").addEventListener('click', () => {
    renderView("login_42");
    window.history.pushState({page: "another"}, "another page", "example.html");
});



// document.addEventListener("DOMContentLoaded", () => {
//     const secondDiv = document.getElementById("content");
//
//     // Add event listeners to buttons
//     document.querySelectorAll("#first-div button").forEach((button) => {
//         button.addEventListener("click", (event) => {
//             const action = event.target.dataset.action; // Get the action from the button's data attribute
//             secondDiv.innerHTML = content[action] || "<p>Invalid action</p>";
//         });
//     });
// });
