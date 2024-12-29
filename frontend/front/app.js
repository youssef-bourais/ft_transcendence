import { routes, populateProfile} from './routes.js';
import { togglePass, logout, clickEvent, GoLogin } from './utils.js';
import { inputSearch, renderAll } from './profile.js';



let currentState = { view: "login" };
let isNavigating = false;

function toggle_visibility(id) 
{
    var e = document.getElementById(id);
    if ( e.style.display == 'block' )
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

const NonAuthenticated = ["/", "/register", "/forget_passwd", "/bridg", "/login_42", "/OTP"];

function toggleNavbarAndSearchBar(path) 
{
    if (!NonAuthenticated.includes(path)) 
    { 

        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const photo = localStorage.getItem("photo"); 

        setTimeout(function() {
            renderAll();
            tournamentOrders();
        }, 100); 
        // if(path === '/profile' || path ==='/eachprofile')
        {
            populateProfile(); 
        }

        document.getElementById("user-username").textContent = username;
        document.getElementById("user-email").textContent = email;
        document.getElementById("user-photo").src = photo;


        navbar.style.display = 'block';
        navbar.style.opacity = '1';
        bruh.style.display = 'flex';
    }
    else 
    {
        bruh.style.display = 'none';
        navbar.style.display = 'none';
    }
}


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
                        }, 10);
                    }
                });
                button.setAttribute('data-listener-attached', 'true');
            }
        });
    }
}

function isUserAuthenticated(path)
{
    if(!localStorage.getItem("accessToken") && !NonAuthenticated.includes(path))
        return false;
    return true
}


export const handleLocation = () => 
{
    inputSearch.value = ""
    const path = window.location.pathname;
    currentState.view = path;

    if(!isUserAuthenticated(path))
    {
        GoLogin();
        return;
    }

    if(localStorage.getItem("accessToken") && NonAuthenticated.includes(path))
    {
        history.pushState({}, "", '/profile'); 
        handleLocation('/profile');
        return;
    }

    const route = routes[path] ? routes[path] : routes["/404"];

    document.getElementById("con").innerHTML = route.html;
    toggleNavbarAndSearchBar(path);
    
    if (route.setup) 
        route.setup();

    handleEvent(".inpute");
    handleEvent(".barinpute", true);
};



document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 
    logout(); 
});

function tournamentOrders()
{
    let joinTournament = document.getElementById("join-tournament");
    if(joinTournament)
    {
        joinTournament.addEventListener("click", function(event) {
            
        });
    }
}

let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function() {
        sidebar.classList.toggle('active'); 
    };   

window.togglePass = togglePass;
window.clickEvent = clickEvent;
window.logout = logout;

window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);


