export const routes = {
    "/" : { 
    html: `
            <div class="cart">
                <h2 class="title"> login </h2>
                <form class="form" id="login-form">
                    <div class="input-group">
                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="">

                        <label for="password">password</label>
                        <input type="password" name="password" autocomplete="on" id="password" placeholder="">

                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#" id="forget-passwd" class="inpute" data-view="forget_passwd">forgot password ?</a>
                        </div>
                    </div>
                    <button type="submit" id="login"  data-view="profile">login</button>
                </form>
                <div class="intra">
                    <div class="line"></div>
                    <p class="message">or</p> 
                    <div class="line"></div>
                </div>
                <button id="login-intra" class="inpute"data-view="login_42">login with 42 intra</button>

                <div class="social-icons">
                    <p class="signup"><br/>don't have an account?
                    <a rel="noopener noreferrer" href="#" class="inpute" id="signup-link" data-view="register">sign up</a>
                    </p>
                </div>
            </div>`,
    setup: setupLoginPage,
    },
    "/register" : {
        html: `
            <div class="cart">
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
            </div>
`,
    setup: setupRegisterPage,
    },
    "/forget_passwd": {
        html: `
            <div class="cart" id="forget-cart">
                <h2 class="title"> Forgot Password ?</h2>
                <form class="form" id="forget-form">
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" autocomplete="on" id="email" placeholder="">
                    </div>
                    <button id="submit">Submit</button>
                </form>
            </div>
`,
        setup: setupForgetPasswordPage,
        },
    "/login_42" : {
        html: `<h2> hola </h2>`,
        setup: setupLogin42Page,
        },
    "/profile" : {
        html:`
            <div class="profile">
                <h1 class="title"> welcome to ur profile !!</h1>
            </div>`,
        setup: setupProfilepage,
    },
    404 : `<h1>404: Page Not Found</h1>`
};

// import { handleLocation } from './app.js';


function setupLoginPage() 
{
    const form = document.getElementById("login-form");
    if (form) 
    {
        form.addEventListener("submit", (event) => 
        {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "user" && password === "pass") 
            {
                console.log("Login successful");
                history.pushState({}, "", "/profile"); // Navigate to profile
                handleLocation();
            } 
            else 
            {
                alert("Invalid username or password");
            }
        });
    }
}

function setupRegisterPage()
{

}

function setupForgetPasswordPage()
{

}

function setupLogin42Page()
{

}


function setupProfilepage()
{

}
