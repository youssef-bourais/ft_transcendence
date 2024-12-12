import { routes} from './routes.js';
import { togglePass, logout, clickEvent } from './utils.js';

let currentState = { view: "login" };


function toggleNavbarAndSearchBar(path) 
{
    const isAuthenticatedRoutes = ["/", "/register", "/forget_passwd", "/bridg", "/login_42", "/OTP"];

    if (!isAuthenticatedRoutes.includes(path)) 
        navbar.classList.add("visible");
    else 
        navbar.classList.remove("visible");
}

let isNavigating = false;

function handleEvent(selector, isNavbar = false)
{
    const Button = document.querySelectorAll(selector);
    if(Button)
    {
        Button.forEach(button => 
        {
            if (!button.hasAttribute('data-listener-attached'))
            {

                button.addEventListener("click", (event) => 
                {
                    event.preventDefault(); 

                    if (isNavigating && isNavbar) 
                        return; 
                    isNavigating = true;

                    const targetView = event.target.dataset.view || event.currentTarget.dataset.view;
                    history.pushState({}, "", targetView); 
                    handleLocation();

                    if(isNavbar)
                    {
                        setTimeout(() => {
                            isNavigating = false;
                        }, 100);
                    }
                });
                button.setAttribute('data-listener-attached', 'true');
            }
        });
    }
}

export const handleLocation = () => 
{
    console.log("handleLocation=========");
    const path = window.location.pathname;
    currentState.view = path;
    const route = routes[path] ? routes[path] : routes["/404"];

    toggleNavbarAndSearchBar(path);
    
    document.getElementById("content").innerHTML = route.html;

    if (route.setup) 
        route.setup();

    handleEvent(".inpute");
    handleEvent(".barinpute", true);
};

document.addEventListener("DOMContentLoaded", () => {

    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const photo = localStorage.getItem("photo"); 

    document.getElementById("user-username").textContent = username;
    document.getElementById("user-email").textContent = email;
    document.getElementById("user-photo").src = photo;
});




let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function() {
    sidebar.classList.toggle('active'); 
};   

document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 
    logout(); 
});

window.togglePass = togglePass;
window.clickEvent = clickEvent;

window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);

