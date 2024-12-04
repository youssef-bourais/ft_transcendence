import { routes} from './routes.js';
import { togglePass, logout } from './utils.js';

let currentState = { view: "login" };

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
    }

    const buttons = document.querySelectorAll(".inpute");

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

};

window.togglePass = togglePass;
window.logout = logout;


window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);

