import { routes} from './routes.js';
import { togglePass, logout } from './utils.js';

let currentState = { view: "login" };

function toggleNavbarAndSearchBar(path) 
{
    // const isAuthenticatedRoutes = ["/register", "/forget_passwd", "/bridg", "login_42"];

    if(path !== '/' && path !== '/register' && path !== '/forget_passwd' && path !== '/bridg' && path !== '/login_42')
        navbar.classList.add("visible");
    else
        navbar.classList.remove("visible");
}

export const handleLocation = () => 
{
    // console.log("handleLocation=========");
    const path = window.location.pathname;
    currentState.view = path;
    const route = routes[path] ? routes[path] : routes["/404"];

    toggleNavbarAndSearchBar(path);
    
    document.getElementById("content").innerHTML = route.html;

    if (route.setup) 
        route.setup();

    const buttons = document.querySelectorAll(".inpute");

    if(buttons)
    {
        // console.log("button: ");
        buttons.forEach(button => 
        {
            button.addEventListener("click", (event) => 
            {
                event.preventDefault(); 
                const targetView = event.target.dataset.view; //get data-view  from button
                history.pushState({}, "", targetView); 
                handleLocation();
            });
        });
    }

    const navbarButton = document.querySelectorAll(".barinpute");
    if(navbarButton)
    {
        navbarButton.forEach(navbutton => 
        {
            navbutton.addEventListener("click", (event) => 
            {
                event.preventDefault(); 
                const targetView = event.currentTarget.dataset.view; //get data-view  from button
                console.log("targetveiw: ", targetView);
                history.pushState({}, "", targetView); 
                // handleLocation();
            });
        });


    }
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

