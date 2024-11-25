export const routes = {
    "/" : { 
    html: `
            <div class="cart">
                <h2 class="title"> login </h2>
                <form class="form" id="login-form">
                    <div class="input-group">
                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="Username" required>

                        <label for="password">password</label>
                        <input type="password" name="password" autocomplete="on" id="password" placeholder="Password" required>

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

                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="username" required>

                        <label for="email">email</label>
                        <input type="text" name="email"  autocomplete="on" id="email" placeholder="email" required>

                        <label for="password">password</label>
                        <input type="password" name="password"  autocomplete="on" id="password" placeholder="password" required>

                        <label for="confirm password">confirm password</label>
                        <input type="password" name="confirm password"  autocomplete="on" id="confirm password" placeholder="confirm password" required>

                        <div id="errordiv" align="center" style="margin-left: auto; margin-right: auto;"> 
                            <span id="error" style="color: white; display: none"></span> 
                        </div>

                    </div>
                    <button class="register">register</button>
                </form>

                
            </div>`,
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
            </div>`,
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

// function validateForm(form) 
// {
//     for (let element of form.elements) 
//     {
//         if (element.name && !element.value) 
//         {
//             alert(`${element.name} must be filled out`);
//             return false; 
//
//         }
//     }
//     return true;
// }

function SanitizeInpute(str) 
{
    const div = document.createElement('div');
    const text = document.createTextNode(str);
    div.appendChild(text); // browser automaticly excape the tags in the text
    return div.innerHTML;
}

// <img src="invalid" onerror="alert('XSS')">

var timer = null;
function showError(message) 
{
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
    var errorElement = document.getElementById("error");
    errorElement.innerHTML = message;
    errorElement.style.display = 'block';
    timer = setTimeout(function(){ errorElement.style.display = 'none'; }, 2000);
}

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    

const checkPasswordStrength = (inputPassword) => 
{
    if(strongPassword.test(inputPassword))
        return 'strong';
    else if(mediumPassword.test(inputPassword))
        return 'medium';
    else
        return 'weak';
}

function validatePassword(password, password2) 
{

    if (password !== password2) 
    {
        // showError("Passwords do not match!");
        return "Passwords do not match!";
        // return; 
    }
    if(password.length < 8)
    {
        // showError("password must be at least 8 characters long");
        return "password must be at least 8 characters long";
    }
    if(checkPasswordStrength(password) === 'weak')
    {
        return "password very weak";
        // showError("password very weak");
        // return;
    }
    return null;
}

function setupRegisterPage() 
{
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (event) => 
    {
        event.preventDefault(); 

        const UserData = 
        {
            username: SanitizeInpute(document.getElementById("username").value),
            email: SanitizeInpute(document.getElementById("email").value),
            password: SanitizeInpute(document.getElementById("password").value),
            password2: SanitizeInpute(document.getElementById("confirm password").value),
        };

        var message = validatePassword(UserData.password, UserData.password2);
        console.log(message);
        if(message !== null)
        {
            showError(message);
            return;
        }
        try 
        {
            const response = await fetch("http://127.0.0.1:8000/api/register/", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserData),
            });

            const data = await response.json();

            if (response.ok)
                alert("User registered successfully!");
            else
            {
                let errorMessage = "Registration failed: ";
                for (const key in data) 
                    if (data[key]) 
                        errorMessage += `${data[key].join(", ")} `;
                        // errorMessage += `${key}: ${data[key].join(", ")} `;
                showError(errorMessage);
            }
        } 
        catch (error) 
        {
            alert("An error occurred. Please try again.");
        }
    });
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
