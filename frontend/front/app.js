import { routes, populateProfile} from './routes.js';
import { togglePass, logout, clickEvent } from './utils.js';

let currentState = { view: "login" };

function toggle_visibility(id) 
{
    var e = document.getElementById(id);
    if ( e.style.display == 'block' )
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

function toggleNavbar(path) 
{
    const isAuthenticatedRoutes = ["/", "/register", "/forget_passwd", "/bridg", "/login_42", "/OTP"];


    if (!isAuthenticatedRoutes.includes(path)) 
    {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const photo = localStorage.getItem("photo"); 
        if(path === '/profile')
            populateProfile(); 

        document.getElementById("user-username").textContent = username;
        document.getElementById("user-email").textContent = email;
        document.getElementById("user-photo").src = photo;

        // navbar.classList.add("visible");
        // bruh.classList.add("visible");

        navbar.style.display = 'block';
        navbar.style.opacity = '1';

        // bruh.style.display = 'block';
        // bruh.style.opacity = '1';
        bruh.style.display = 'flex';

        // navbar.offsetHeight; // Trigger a reflow
        // location.reload();
        // navbar.style.display = 'block';     // Show
        // bruh.style.display = 'block';     // Show
    }
    else 
    {
        // navbar.classList.remove("visible");
        // navbar.style.visibility = 'hidden';
        // bruh.style.visibility = 'hidden';      // Hide
        bruh.style.display = 'none';
        navbar.style.display = 'none';
    }
    
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
                        }, 10);
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
      
    // if(path === '/' || path === '/register' || path === '/OTP', "/forget_passwd", "/bridg", "/login_42")
    //     document.getElementById("loginn").innerHTML = route.html;
    // else

    toggleNavbar(path);
    document.getElementById("con").innerHTML = route.html;
    
    
    // for debugging
    const test = document.getElementById("test")
    if(test)
        test.addEventListener("click", (e)=>{

        fetch('https://localhost/api/endpoint/', {method:"GET", credentials:"include"}).then(async e=>{

            e.json().then(e=>{
                console.log(e);
        });
        
        const inputSearch = document.getElementById('input-search');
        inputSearch.style.backgroundColor = "red";
});


});

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


document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 
    logout(); 
});

export function createNavBar() {
    return `
        <!-- start top nav bar -->
        <div class="container-top">
            <div class="container-title">
                <img src="./images/Pingo.svg" alt="" srcset="">
            </div>
            <div class="container-search">
                <div class="search">
                    <input type="search" placeholder="Search for people" id="input_search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <i class="fa-solid fa-delete-left" id="delete"></i> 
                </div>
            </div>
            
            <div class="container-profile">
                <div class="profile">
                    <img class="avatars" src="./images/avatar.png" alt="">
                    <div class="container-notification">
                        <p>Abdelkarim hajji</p>
                        <p>2 unread notifications</p>
                    </div>
                    <div class="icon-down">
                        <div class="container-icon">
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end top nav bar -->
    `;
}




window.onload = () => {
    const inputSearch = document.getElementById('input_search');
    if (inputSearch) {
        // Change background color to red
    let  output = document.getElementById("container-outputs");
        
        // Add 'input' event listener
        inputSearch.addEventListener('input', (event) => {
            const username = event.target.value;  // Get the current value of the input
            
            // If the username is not empty, send a fetch request
            if (username.trim()) {
                fetch(`/api/get/${username}/`)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Response from server:', data);
                        if(event.target.value != 0)
                            output.style.display = "flex"
                        else
                            output.style.display = "none";
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        });
    } else {
        console.error("Element with ID 'input-search' not found.");
    }
};

window.togglePass = togglePass;
window.clickEvent = clickEvent;
window.logout = logout;

window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);
