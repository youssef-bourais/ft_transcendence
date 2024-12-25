import { routes, populateProfile} from './routes.js';
import { togglePass, logout, clickEvent } from './utils.js';
import { startChat } from './chat.js';
import {SecureApiRequest} from './api.js';

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
let  output = document.getElementById("container-outputs");
let inputSearch = document.getElementById('input_search');

export const handleLocation = () => 
{
    inputSearch.value = ""
    const path = window.location.pathname;
    currentState.view = path;

    if(path === '/profile')
    {
        setTimeout(function() {
            renderAll();
        }, 100); 
    }
    console.log(path);
    const route = routes[path] ? routes[path] : routes["/404"];

    document.getElementById("con").innerHTML = route.html;
    toggleNavbar(path);
    
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

// Function that will be triggered when the user clicks the "Upload Image" button
function uploadImage() {
    // Get the file input element
    let fileInput = document.getElementById("file-input");
    // Check if the user has selected a file
    if (fileInput.files && fileInput.files[0]) {
      // Get the first file (image)
      const file = fileInput.files[0];
  
      // Create a FormData object to send the image data
      const formData = new FormData();
  
      // Append the file to the FormData object
      formData.append('image', file);
  
      // Send the FormData to the backend using fetch or XMLHttpRequest
      fetch('/upload', {
        method: 'POST',
        body: formData,  // Send the FormData as the body of the request
      })
      .then(response => response.json())  // Parse the JSON response
      .then(data => {
        console.log('Success:', data);
        alert('Image uploaded successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading image');
      });
    } else {
      alert('Please select an image file first');
    }
  }
 
function renderAll() {
        
    console.log("render all ok bro ")
   ;
    if (inputSearch) {
    
    let  notFound = document.getElementById("not-found");
    let  nameSearch = document.getElementById("name-search");
    let  imgSearch = document.getElementById("img-search");
    let  buttonFriend = document.getElementById("button-friend");
    let  buttonFriend2 = document.getElementById("button-friend2");
    let usernameIdProfile = document.getElementById("usernameIdProfile");
        let emailIdProfile = document.getElementById("emailIdProfile");
        let passwordIdProfile = document.getElementById("passwordIdProfile");
        let passwordIdProfileConfirme = document.getElementById("passwordIdProfileConfirme");
        let checkBox = document.getElementById("check-box");
        
        let errorMessage = document.getElementById("error-message");
        let validForm = 0;
        let validPassword = 0;

   
        let  userNameFriend = document.getElementById("userNameProfile")
        if(userNameFriend)
        userNameFriend.innerHTML = localStorage.getItem("username");
    
        let  emailProfile = document.getElementById("emailProfile");
        if(emailProfile)
            emailProfile.innerHTML = localStorage.getItem("email");


            let cancel = document.getElementById("cancel");
            
            let save = document.getElementById("save");
            let containerEdit = document.getElementById("container-edit");
            let editProfile = document.getElementById("edit-profile");
            let containerError = document.getElementById("container-error")
            if(cancel)
            {
                cancel.addEventListener("click", function() {
                    containerEdit.style.display = "none";
                    containerError.style.display = "none"
                    validForm = 0;
                    validPassword = 0;
                    usernameIdProfile.value = ""
                    emailIdProfile.value = ""
                    passwordIdProfile.value = ""
                    passwordIdProfileConfirme.value = ""
                  });
    
                editProfile.addEventListener("click", function() {
                    containerEdit.style.display = "flex";
                });
            }
            
            if(save)
            {
                save.addEventListener("click", function() {
                    if(usernameIdProfile.value == "" || emailIdProfile.value == "" || passwordIdProfile.value == "" || passwordIdProfileConfirme.value == "")
                        validForm = 1;
                    else
                        validForm = 0
        
                    if(passwordIdProfile.value != passwordIdProfileConfirme.value)
                        validPassword = 1;
                    else
                        validPassword = 0;
                        if(validForm == 1)
                        {
                            containerError.style.display ="flex";
                            errorMessage.innerHTML = "Error in input !!!"
                            console.log("lowla", usernameIdProfile.value)
                        }
                        else if(validPassword == 1)
                        {
                            containerError.style.display ="flex";
                            errorMessage.innerHTML = "password not correct !!!"
                            console.log("tania")
                        }
                        else
                        {
        
                            containerError.style.display = "none"
                            containerEdit.style.display = "none";
                            validForm = 0;
                            validPassword = 0;
                            usernameIdProfile.value = ""
                            emailIdProfile.value = ""
                            passwordIdProfile.value = ""
                            passwordIdProfileConfirme.value = ""
                        }
                        console.log("hiiiiii karim fin")
                    });
            }
    let  nameNotification = document.getElementById("nameNotification")
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
                            localStorage.setItem('eachProfileUserName', data.username);

                        }
                        console.log("i am here in data");
                    })
                    .catch(error => {
                        // console.error('Error fetching data:', error);
                        // nameSearch.innerHTML = "NotFound";
                        // console.log("i am there error data");
                    });
            }
            
            buttonFriend.addEventListener("click", function() {
                inputSearch.value = "";
               
                // handleLocation("/eachprofile")
            });
            if(event.target.value.length > 0)
                output.style.display = "flex"
            else if(event.target.value <= 0)
                output.style.display = "none";

        });
    } else {
        console.error("Element with ID 'input-search' not found.");
    }

    async function fetchDataFriends() {
        const info = await SecureApiRequest("/api/friend/get_friends/");
        let friendsContainer = document.getElementById("list-friends-profile");
        console.log("friends:===========", info.friends)

        // console.log("this all my friends => ", info.friends.photo)
        if(info.friends.length > 0)
        {
            if(friendsContainer)
            {
                var i = 0;


            const friendsList = document.getElementById('list-friends-profile');
            friendsList.innerHTML = '';

            const friendsToRender = info.friends.map(friend => ({
                name: friend.username, 
                avatar: friend.photo  
            }));


            friendsToRender.forEach(friend => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="friend-item">
                        <img src="${friend.avatar}" alt="${friend.name}'s avatar" class="friend-avatar">
                        <span class="friend-name">${friend.name}</span>
                    </div>
                `;
                // li.addEventListener('click', () => selectFriend(friend));
                friendsList.appendChild(li);
            });

                // while(i <= info.friends.length)
                // {
                //     friendsContainer.innerHTML = `
                //     <div class="container-setting">
                //         <div class="container-img"><img style="border-radius: 50%;" src="${info.friends[i].photo}" ></div>
                //         <div class="container-name">
                //             <p class="display-name">${info.friends[i].username}</p>
                //             <!-- <p>${info.friends[i].username}</p> -->
                //         </div>
                //     </div>`
                //     i++;
                // }
            }
        }
        else
        {
            if(friendsContainer)
            {
                friendsContainer.innerHTML = `
                <div class="container-setting" style="justify-content: center; align-items: center;">
                    <p>No friends</p>
                </div>`
            }
            
        }
        
    }
    fetchDataFriends();
    
  
    // each profile 

    let usernameEachProfile = document.getElementById("usernmaeEachProfile");
    let usernameEachProfile2 = document.getElementById("usernmaeEachProfile2");
    let usernameEachProfile3 = document.getElementById("usernmaeEachProfile3");
    let emailEachProfile = document.getElementById('emailEachProfile');
    let imageEachProfile = document.getElementById("imageEachProfile");
    let imageEachProfile2 = document.getElementById("imageEachProfile2");
    let imageEachProfile3 = document.getElementById("imageEachProfile3");

    fetch(`/api/get/${localStorage.getItem('eachProfileUserName')}/`)
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);
        if(data.error == "User not found")
        {
            
        }
        else{
            usernameEachProfile.innerHTML = data.username;
            usernameEachProfile2.innerHTML = data.username;
            usernameEachProfile3.innerHTML = data.username;
            emailEachProfile.innerHTML = data.email;
            imageEachProfile.src = data.photo;
            imageEachProfile2.src = data.photo;
            imageEachProfile3.src = data.photo;
        }
        
    })
    .catch(error => {
        
    });
 } 




document.addEventListener("DOMContentLoaded", function() {
    
  });

window.togglePass = togglePass;
window.clickEvent = clickEvent;
window.logout = logout;

window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);
