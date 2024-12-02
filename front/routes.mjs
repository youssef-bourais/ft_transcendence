
let currentState = { view: "login" };


const BASE_URL = "http://127.0.0.1:8000/api/"; // Your Django backend URL

export const handleLocation = () => 
{
    console.log("handleLocation");
    const path = window.location.pathname;
    currentState.view = path;
    const route = routes[path] || routes[404];

    document.getElementById("content").innerHTML = route.html;

    if (route.setup) 
    {
            route.setup();
            // handleLocation();
    }

    const buttons = document.querySelectorAll(".inpute");

    buttons.forEach(button => 
    {
        button.addEventListener("click", (event) => 
        {
            event.preventDefault(); 
            const targetView = event.target.dataset.view;
            history.pushState({}, "", targetView); 
            handleLocation();
        });
    });

};

export const routes = {

    "/" : { 
    html: `
            <div class="cart">
                <h2 class="title"> login </h2>
                <form class="form" id="login-form">
                    <div class="input-group">
                        <label for="username">username</label>
                        <input type="text" name="username" autocomplete="on" id="username" placeholder="Username" required>

                        <div class="form-group">
                            <label for="password">password</label>
                            <input type="password" name="password" autocomplete="on" id="password" placeholder="Password" required>

                            <svg onclick="togglePass('password')" id="Layer_1password" data-name="Layer 1" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/></svg>
                            <svg onclick="togglePass('password')" hidden id="Layer_2password" data-name="Layer 2" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/></svg>
                        </div>
                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#" id="forget-passwd" class="inpute" data-view="forget_passwd">forgot password ?</a>
                        </div>
                    </div>
                    <button type="submit" id="login"  data-view="profile">login</button>
                </form>
                
                <div id="errordiv" align="center" style="margin-left: auto; margin-right: auto;"> 
                    <span id="error" style="color: white; display: none"></span> 
                </div>

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



                        <div class="form-group">
                            <label for="password">password</label>
                            <input type="password" name="password"  autocomplete="on" id="password" placeholder="password" required>

                            <svg onclick="togglePass('password')" id="Layer_1password" data-name="Layer 1" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/></svg>
                            <svg onclick="togglePass('password')" hidden id="Layer_2password" data-name="Layer 2" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/></svg>
                        </div>


                        <div class="form-group">
                            <label for="confirm password">confirm password</label>
                            <input type="password" name="confirm password"  autocomplete="on" id="password2" placeholder="confirm password" required>

                        
                            <svg onclick="togglePass('password2')" id="Layer_1password2" data-name="Layer 1" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/></svg>
                            <svg onclick="togglePass('password2')" hidden id="Layer_2password2" data-name="Layer 2" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/></svg>
                        </div>


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
        html: ``,
        setup: setupLogin42Page,
        },
    "/profile" : {
        html:`
        <div id="profile-container">
            <div id="avatar-section">
                <img id="avatar" src="https://via.placeholder.com/150" alt="Default Avatar">
                <input type="file" id="avatar-upload" accept="image/*" onchange="uploadAvatar(event)">
            </div>
            <div id="info-section">
                <h2 id="display-name">${localStorage.getItem("username")}</h2>
                <button id="edit-name" onclick="editDisplayName()">Edit</button>
                <p id="stats">
                    Wins: <span id="wins">0</span> | Losses: <span id="losses">0</span>
                </p>
            </div>
            <div id="friends-section">
                <h3>Friends</h3>
                <ul id="friends-list">
                    <li>John Doe <span class="status online">Online</span></li>
                    <li>Jane Smith <span class="status offline">Offline</span></li>
                </ul>
            </div>
            <div id="history-section">
                <h3>Match History</h3>
                <ul id="history-list">
                    <li>1v1 with Jane Smith - Won on 2024-11-25</li>
                    <li>1v1 with John Doe - Lost on 2024-11-20</li>
                </ul>
            </div>
            <button id="logoutButton" onclick="logout()">Logout</button>
        </div>`,
        setup: setupProfilepage,
    },
    "/bridg" : {
        html :``,
        setup: handleRedirect,
    },
    404 : `<h1>404: Page Not Found</h1>`
};

// function logout() 
// {
//     // Remove the logged-in token
//     // localStorage.removeItem('access');
//     alert('Logged out! Access to /profile is restricted.');
// }

async function refreshAccessToken() 
{
    try 
    {
        const refreshToken = localStorage.getItem("refreshToken");

            const response = await fetch(`/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) 
        {
            alert("Failed to refresh the access token. Please log in again.");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return; 
        }

        const data = await response.json();

        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", data.access);
        console.log("Access token successfully refreshed.");
    } 
    catch (error) 
    {
        console.error("Error occurred while refreshing the access token:", error.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("Session expired. Please log in again.");
    }
}


async function SecureApiRequest(endpoint, method = "GET", body = null) 
{
    const token = localStorage.getItem("accessToken");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const request = 
    {
        method,
        headers,
    };

    if (body) 
        request.body = JSON.stringify(body);

    try 
    {
        const response = await fetch(`${endpoint}`, request);

        if (response.status === 401) 
        {
            try 
            {
                await refreshAccessToken(); 
                return SecureApiRequest(endpoint, method, body); 
            } 
            catch 
            {
                console.error("Error refreshing access token.");
                alert("Authentication failed. Please log in again.");
                throw new Error("Authentication failed.");
            }
        }
        if (response.ok) 
        {
            const data = await response.json();
            console.log("SecureApiRequest successful:", data);
            return data;
        }

        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error(errorData.detail || "API error occurred.");
    } 
    catch (error) 
    {
        console.error("Error in SecureApiRequest:", error.message);
        alert("An error occurred. Please try again.");
        throw error; 
    }
}

function setupLoginPage() 
{
    console.log("login page");
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (event) => 
    {
        event.preventDefault();
        const UserData = 
        {
            username : SanitizeInpute(document.getElementById("username").value),
            password : SanitizeInpute(document.getElementById("password").value),
        };
        try
        {
            const response = await fetch("/api/token/", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserData),
            });

            const data = await response.json();

            localStorage.setItem("username", UserData.username);
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("accessToken", data.access);
            console.log("username:", localStorage.getItem("username"));

            if(response.ok)
            {
                console.log("Login successful");
                alert("login successful");
                history.pushState({}, "", "/profile"); 
                handleLocation();
            }
            else
            {
                showError("invalid username or passsword");
            }
        }
        catch (error)
        {
            alert("An error occurred. Please try again.");
        }

    });
}

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
    timer = setTimeout(function(){ errorElement.style.display = 'none'; }, 4000);
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

function isEmptyOrSpaces(str)
{
    return str === null || str.match(/^ *$/) !== null;
}

function validatePassword(password, password2, email) 
{

    if (password !== password2) 
        return "Passwords do not match!";
    if(password.length < 8)
        return "password must be at least 8 characters long";
    if(checkPasswordStrength(password) === 'weak')
        return "password very weak";
    if (isEmptyOrSpaces(email))
        return 'Email cannot be empty';
    return null;
}

function setupRegisterPage() 
{
    console.log("register page");
    const form = document.getElementById("register-form");
    form.addEventListener("submit", async (event) => 
    {
        event.preventDefault(); 
        const UserData = 
        {
            username: SanitizeInpute(document.getElementById("username").value),
            email: SanitizeInpute(document.getElementById("email").value),
            password: SanitizeInpute(document.getElementById("password").value),
            password2: SanitizeInpute(document.getElementById("password2").value),
        };

        var message = validatePassword(UserData.password, UserData.password2, UserData.email);
        if(message !== null)
        {
            showError(message);
            return;
        }
        try 
        {
            const response = await fetch("/api/register/", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(UserData),
            });

            const data = await response.json();

            if (response.ok)
            {

                alert("User registered successfully!");
                console.log("Registration successful");
                history.pushState({}, "", "/");
                handleLocation();
            }
            else
            {
                let errorMessage = "Registration failed: ";
                for (const key in data) 
                    if (data[key]) 
                        errorMessage += `${key} :${data[key].join(", ")} `;
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

async function setupLogin42Page() 
{
    try 
    {
        const response = await fetch('/api/auth/login/', {
        });
        console.log("status============", response.status);

        if (!response.ok) 
            throw new Error('OAuth2 initiation failed + ' + response.status);

        const data = await response.json();

        if (data.redirectUrl) 
        {
            console.log("data, ", data);
            console.log("redirectUrl:  ", data.redirectUrl);
            window.location.href = data.redirectUrl;  // Redirect to OAuth2 authorization page
            // history.pushState({}, "", "/profile");
            // handleLocation();
        }
    } 
    catch (error) 
    {
        console.error('Error initiating OAuth2:', error);
        alert('An error occurred while initiating OAuth2. Please try again later.');
    }
}

function getCookie(name) 
{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`); 
    if (parts.length === 2) 
        return parts.pop().split(';').shift();
}

function deleteCookie(name) 
{
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

function handleRedirect() 
{
    const email = getCookie('email');
    deleteCookie("email");
    const username = getCookie('username');
    deleteCookie("username");
    const photo = getCookie('photo');
    deleteCookie("photo");
    localStorage.setItem("username", username);
    // console.log('User Info from Cookies:', email, username, photo);
    history.pushState({}, "", "/profile");
    handleLocation();
}

function setupProfilepage()
{
    console.log("from profile.....hah", localStorage.getItem("username"));
    // window.location.href = "/login";
}

