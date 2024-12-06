import { routes} from './routes.js';
import { togglePass, logout } from './utils.js';

let currentState = { view: "login" };


function toggleNavbarAndSearchBar(path) 
{
    const isAuthenticatedRoutes = ["/", "/register", "/forget_passwd", "/bridg", "/login_42"];

    if (!isAuthenticatedRoutes.includes(path)) 
        navbar.classList.add("visible");
    else 
        navbar.classList.remove("visible");
}

let isNavigating = false;

function handleEvent(selector, isNavbar = false)
{
    const navbarButton = document.querySelectorAll(selector);
    if(navbarButton)
    {
        navbarButton.forEach(navbutton => 
        {
            if (!navbutton.hasAttribute('data-listener-attached'))
            {

                navbutton.addEventListener("click", (event) => 
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
                navbutton.setAttribute('data-listener-attached', 'true');
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


let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function() {
    sidebar.classList.toggle('active'); 
};   

window.togglePass = togglePass;
window.logout = logout;

window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);

