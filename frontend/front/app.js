import { routes, populateProfile} from './routes.js';
import { togglePass, logout, clickEvent } from './utils.js';
import { startChat } from './chat.js';

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
    const isAuthenticatedRoutes = ["/", "/register", "/forget_passwd", "/bridg", "/login_42", "/OTP", "chat"];


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

    document.getElementById("con").innerHTML = route.html;
    toggleNavbar(path);
    
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






window.onload = () => {
    const inputSearch = document.getElementById('input_search');
    if (inputSearch) {
    let  output = document.getElementById("container-outputs");
    let  notFound = document.getElementById("not-found");
    let  nameSearch = document.getElementById("name-search");
    let  imgSearch = document.getElementById("img-search");
    let  buttonFriend = document.getElementById("button-friend");
    let  buttonFriend2 = document.getElementById("button-friend2");
    let  userNameFriend = document.getElementById("userNameProfile")


    if(userNameFriend)
        userNameFriend.innerHTML = localStorage.getItem("username");
    let  emailProfile = document.getElementById("emailProfile");
    if(emailProfile)
        emailProfile.innerHTML = localStorage.getItem("email");
    let  nameNotification = document.getElementById("nameNotification")
    if(nameNotification)
        nameNotification.innerHTML = localStorage.getItem("username");
    inputSearch.addEventListener('input', (event) => {
        
    const username = event.target.value;  
    let valid = 0;
    if (username.trim()) {
        fetch(`/api/get/${username}/`)
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                if(data.error == "User not found")
                {
                    nameSearch.innerHTML = "User not found";
                    imgSearch.src = "./images/notFound.png";
                    buttonFriend.style.display = "none"
                    buttonFriend2.style.display = "flex"
                }
                else
                {

                    nameSearch.innerHTML = data.username;
                    imgSearch.src = data.photo;
                    buttonFriend.style.display = "flex"
                    buttonFriend2.style.display = "none"
                }
                console.log("i am here in data");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // nameSearch.innerHTML = "NotFound";
                // console.log("i am there error data");
            });
        }
        if(event.target.value.length > 0)
            output.style.display = "flex"
        else if(event.target.value <= 0)
            output.style.display = "none";
    });
    } else {
        console.error("Element with ID 'input-search' not found.");
    }
};

window.togglePass = togglePass;
window.clickEvent = clickEvent;
window.logout = logout;

window.addEventListener("popstate", handleLocation);

// document.addEventListener('DOMContentLoaded', () => {
//     startChat();
// });
// document.addEventListener('DOMContentLoaded', startChat);

window.addEventListener("DOMContentLoaded", handleLocation);
