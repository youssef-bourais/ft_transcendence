import { routes } from './routes.mjs';

let currentState = { view: "login" };

function togglePass(id_name) 
{
    console.log("hello");

    var x = document.getElementById(id_name);
    var l1 = document.getElementById("Layer_1" + id_name);
    var l2 = document.getElementById("Layer_2" + id_name);
    if (x.type === "password") 
    {
        x.type = "text";
        l1.setAttribute('hidden', true);
        l2.removeAttribute('hidden');
    } 
    else 
    {
        x.type = "password";
        l1.removeAttribute('hidden');
        l2.setAttribute('hidden', true);
    }
}

const handleLocation = () => 
{
    const path = window.location.pathname;
    console.log("path", path);
    currentState.view = path;
    const route = routes[path] || routes[404];

    document.getElementById("content").innerHTML = route.html;

    if (route.setup) 
        route.setup();

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
window.togglePass = togglePass;
window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);

