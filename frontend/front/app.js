import { routes, populateProfile} from './routes.js';
import { togglePass, logout, clickEvent, GoLogin } from './utils.js';
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

const NonAuthenticated = ["/", "/register", "/forget_passwd", "/bridg", "/login_42", "/OTP"];

function toggleNavbarAndSearchBar(path) 
{
    if (!NonAuthenticated.includes(path)) 
    { 

        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const photo = localStorage.getItem("photo"); 
        // callForTopNav();
        setTimeout(function() {
            renderAll();
            tournamentOrders();
            callForTopNav();
        }, 100); 
        
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

let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function() {
    sidebar.classList.toggle('active'); 
};   


document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 
    logout(); 
});

function uploadImage() {
    
    let fileInput = document.getElementById("file-input");
    let labelInput = document.getElementById("label-input");
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
 
function renderAll() 
{
        
    console.log("render all ok bro ");
    if (inputSearch) 
    {
    
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
            
            // editProfile
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
                const photo = localStorage.getItem("photo");
                const username = localStorage.getItem("username");
                // const email = localStorage.getItem("email");

                const avatar = document.getElementsByClassName("avatars");
                let i = 0;
                while(i < avatar.length)
                {   
                    avatar[i].src = photo;
                    i++;
                }
                fetch(`/api/get/${localStorage.getItem("username")}/`)
                .then(response => response.json())
                .then(data => {
                    console.log("get item ===> ", data)
                    if(data.is_2fa_enabled == true)
                        checkBox.checked = true
                    else
                        checkBox.checked = false
                        usernameIdProfile.value = data.username;
                        emailIdProfile.value = data.email;

                    console.log("i am here in data");
                })
                .catch(error => {
                    
                });
            });
        }
            

        fetch(`/api/get/${localStorage.getItem("username")}/`)
        .then(response => response.json())
        .then(data => {
            if(data.id > 100)
                editProfile.style.display = "none"
            console.log("i am here in data");
        })
        .catch(error => {
            
        });
        

        let fileInput = document.getElementById("file-input");
        let labelInput = document.getElementById("label-input");
        let imgUpdate = document.getElementById("img-update");
        let send_image = "";
        if(fileInput)
        {
            fileInput.addEventListener("change", function(event) {
                const file = event.target.files[0];
                if(file)
                {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        
                        imgUpdate.src = e.target.result; 
                        send_image = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if(save)
        {
            save.addEventListener("click", function() {
                
                // if(usernameIdProfile.value == "" || emailIdProfile.value == "" || passwordIdProfile.value == "" || passwordIdProfileConfirme.value == "")
                //     validForm = 1;
                // else
                //     validForm = 0
    
                // if(passwordIdProfile.value != passwordIdProfileConfirme.value)
                //     validPassword = 1;
                // else
                //     validPassword = 0;

                // if(validForm == 1)
                // {
                //     containerError.style.display ="flex";
                //     errorMessage.innerHTML = "Error in input !!!"
                //     console.log("lowla", usernameIdProfile.value)
                // }
                // else if(validPassword == 1)
                // {
                //     containerError.style.display ="flex";
                //     errorMessage.innerHTML = "password not correct !!!"
                //     console.log("tania")
                // }
                // else
                // {
                    
                 
                    async function sendRequestUpdateProfile() {
                        console.log("hi mister karim")
                        let stateCheck;
                        if(checkBox.checked)
                            stateCheck = true;
                        else
                            stateCheck = false;
                        console.log(`{"username":"${usernameIdProfile.value}", "email":"${emailIdProfile.value}", "password":"${passwordIdProfile.value}", "repeat_password": "${passwordIdProfileConfirme.value}", "photo":"${send_image}", "is_2fa_enabled":"${stateCheck}"}`)
                       
                        const info = await SecureApiRequest("/api/update/profile/","PATCH", `{"username":"${usernameIdProfile.value}", "email":"${emailIdProfile.value}", "password":"${passwordIdProfile.value}", "repeat_password": "${passwordIdProfileConfirme.value}", "is_2fa_enabled":"${stateCheck}"}`);
                        
                        console.log("info:::::::", info);
                    }
                    sendRequestUpdateProfile();
                    containerError.style.display = "none"
                    containerEdit.style.display = "none";
                    validForm = 0;
                    validPassword = 0;
                    usernameIdProfile.value = ""
                    emailIdProfile.value = ""
                    passwordIdProfile.value = ""
                    passwordIdProfileConfirme.value = ""
                    imgUpdate.src = ""
                // }
                
                });
        }
            
        // let fileInput = document.getElementById("file-input");
        // let labelInput = document.getElementById("label-input");
        // let imgUpdate = document.getElementById("img-update");
        
        
    
        if(inputSearch.value.length <= 0)
            output.style.display = "none";

        let  nameNotification = document.getElementById("nameNotification")
        nameNotification.innerHTML = localStorage.getItem("username");
        inputSearch.addEventListener('input', (event) => {
            const username = event.target.value;  
            let valid = 0;
            
            if (username.trim()) 
            {
                fetch(`/api/get/${username}/`)
                    .then(response => response.json())
                    .then(data => {
                        // console.log('Response from server:', data);
                        if(data.error == "User not found")
                        {
                            nameSearch.innerHTML = "User not found";
                            imgSearch.src = "./images/notFound.png";
                            buttonFriend.style.display = "none"
                            buttonFriend2.style.display = "flex"
                        }
                        else if(data.username != localStorage.getItem("username"))
                        {
                            nameSearch.innerHTML = data.username;
                            imgSearch.src = data.photo;
                            buttonFriend.style.display = "flex"
                            buttonFriend2.style.display = "none"
                            localStorage.setItem('eachProfileUserName', data.username);
                            console.log(data.username)
                            localStorage.setItem('eachProfileUserId', data.id);
                            console.log("see this data===> ",data);
                           

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
    } 
    else 
    {
        console.error("Element with ID 'input-search' not found.");
    }


    async function fetchDataFriends() 
    {
        const info = await SecureApiRequest("/api/friend/get_friends/");
        if(!info)
            return;
        let friendsContainer = document.getElementById("list-friends-profile");

        if(friendsContainer)
        {

        
        friendsContainer.innerHTML = '';

        // console.log("this all my friends => ", info.friends)
        // console.log("this all my friends => ", info.friends.length)
        if(info.friends.length > 0)
        {
            // if(friendsContainer)
            // {
                
                var i = 0;
                while(i < info.friends.length)
                {
                    friendsContainer.innerHTML += `
                    <div class="container-setting">
                        <div class="container-img"><img style="border-radius: 50%;" src="${info.friends[i].photo}" ></div>
                        <div class="container-name">
                            <p class="display-name">${info.friends[i].username}</p>
                            <!-- <p>${info.friends[i].username}</p> -->
                        </div>
                    </div>`
                    i++;
                }
            // }
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

    const eachProfileUserName = localStorage.getItem("eachProfileUserName");
    if(eachProfileUserName)
    {
        fetch(`/api/get/${eachProfileUserName}/`)
        .then(response => response.json())
        .then(data => {
            console.log("i am her i will ")
            console.log('Response from server karim ok ::::', data);
            if(data.error == "User not found")
            {
                
            }
            else{
                if(usernameEachProfile)
                {
                    usernameEachProfile.innerHTML = data.username;
                    usernameEachProfile2.innerHTML = data.username;
                    usernameEachProfile3.innerHTML = data.username;
                    emailEachProfile.innerHTML = data.email;
                    imageEachProfile.src = data.photo;
                    imageEachProfile2.src = data.photo;
                    imageEachProfile3.src = data.photo;
                }
            }


        });
    }
    let addFriendButton = document.getElementById("addFriendButton");
    async function checkButtonAddFriend() 
    {

       
        if(addFriendButton)
        {
            const info = await SecureApiRequest("/api/friend/get_friends/");
            // if(!info)
            //     return;
            
            console.log("i am inside checkButtonAddFriend ok bro", info)
            let i = 0;
            let valid = 0;
            console.log("nchofo info ====> ",info.friends, localStorage.getItem("eachProfileUserName"))
            while(i < info.friends.length)
            {
                console.log("comp ==> ",info.friends[i].username)
                if(info.friends[i].username == localStorage.getItem("eachProfileUserName"))
                    valid = 1;
                i++;
            }
            if(valid == 1)
                addFriendButton.innerHTML = "Message";
            else if(valid == 0)
                addFriendButton.innerHTML = "Add Friend +";
        }
        
    }
    checkButtonAddFriend()



    async function sendFriend()
    {
        const info = await SecureApiRequest("/api/friend/add/", "POST", `{"to_user": "${localStorage.getItem("eachProfileUserId")}"}`);
        // if(!info)
        //     return;
        console.log("info ==========> ",info, localStorage.getItem("eachProfileUserId"))

        // localStorage.setItem('eachProfileUserName', data.username);
        
    }

    if(addFriendButton)
    {
        addFriendButton.addEventListener("click", function(event) {
            if(addFriendButton.innerHTML == "Add Friend +")
            {
                sendFriend();
            }
            else if(addFriendButton.innerHTML == "Message")
            {
                // alert("1")
                localStorage.setItem("openChat",localStorage.getItem("eachProfileUserName"));
                history.pushState({}, "", '/chat'); 
                
                handleLocation();
            }
        });
    }

}

function tournamentOrders()
{
    let joinTournament = document.getElementById("join-tournament");
    if(joinTournament)
    {
        joinTournament.addEventListener("click", function(event) {
            
        });
    }
}


//     fetch(`/api/get/${localStorage.getItem('eachProfileUserName')}/`)
//      .then(response => response.json())
//    .then(data => {
//   console.log('Response from server:', data);
//         if(data.error == "User not found")
//        {
//
//         }
//       .catch(error => {
//
//       });
//   }
// } 
//
//
//  });

async function acceptRequest(id)
{
    const info = await SecureApiRequest("/api/friend/respond_friend_request/", "POST", `{"request_id": ${id}, "action": "accept"}`);
}

async function returnDataFriendsResquest()
{
    const info = await SecureApiRequest("/api/friend/list_friends_request/", "GET");
    return info;
}

async function callForTopNav()
{
    
    // const info = await SecureApiRequest("/api/friend/list_friends_request/", "GET")
    let iconDownbutton =  document.getElementById("iconDownbutton");
    let poupapNotification = document.getElementById("poupapNotification")
    let removeNotifcationBackground = document.getElementsByClassName("removeNotifcationBackground")[0];
    let valid = 0
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.length > 0) {
          const classNames = event.target.classList.toString();
          let array = ["poupap-notifacation", "second-name", "first-img", "third-button", "container-request", "first-imgI", "second-nameP", "third-buttonB"]
          let I = 0;
          let validNot = 0;
          while(I < array.length)
          {
            if(classNames != array[I])
            {
                // alert(1)
                validNot++;
            }
            I++;
          }
          if(validNot == 8)
            poupapNotification.style.display = "none"
            validNot = 0;
        }
      });
    iconDownbutton.addEventListener('click', async function(){
       
        const info = await SecureApiRequest("/api/friend/list_friends_request/", "GET");
       
        poupapNotification.innerHTML = ``;
        
        // console.log("poupapNotification.style.display ===> ", poupapNotification.style.display)
        if(valid == 0)
        {
            
            valid = 1;
            poupapNotification.style.display = "flex"
            let i = 0;
            if(info.incoming_requests.length > 0)
            {   
                while(i < info.incoming_requests.length)
                {
                    poupapNotification.innerHTML += `
                    <div class="container-request">
                        <div class="first-img"><img class="first-imgI" src="${info.incoming_requests[i].from_user_photo}" alt="" srcset=""></div>
                        <div class="second-name"><p class="second-nameP">${info.incoming_requests[i].from_user}</p></div>
                        <div class="third-button" id="${info.incoming_requests[i].id}"><button class="third-buttonB">accept</button></div>
                    </div>
                    `;
                    i++;
                }
                let button  = document.getElementsByClassName("third-button");
                let j = 0;
                let count = 0;
                while (j < button.length) {
                    let currentButton = button[j];
                    currentButton.addEventListener("click", function() {
                        console.log("count ok ===> ",count)
                        count++
                        let requestId = this.id;
                        acceptRequest(requestId);
                        console.log("Button clicked with request ID: ", requestId);
                        let grandParent = currentButton.parentElement;
                        grandParent.style.display = "none";
                        if(button.length == 1 || button.length == count)
                        {
                            count = 0;
                            poupapNotification.innerHTML = `
                            <div class="container-request" style="display:flex; justify-content:center; align-items: center; height:50px;">
                                <p>No one</p>
                            </div>
                            `;
                        }
                    });

                    j++;
                }
                
               
                
            }
            else
            {
                poupapNotification.innerHTML = `
                    <div class="container-request" style="display:flex; justify-content:center; align-items: center; height:50px;">
                        <p>No one</p>
                    </div>
                    `;
            }
        }
        else if(valid == 1)
        {
            valid = 0;
            console.log("111111111111111")
            poupapNotification.style.display = "none"
        }
    })
}

async function removeNotification()
{
    
}

window.togglePass = togglePass;
window.clickEvent = clickEvent;
window.logout = logout;

window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);


