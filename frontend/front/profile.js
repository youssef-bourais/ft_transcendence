

import {showError} from './utils.js';
import {SecureApiRequest} from './api.js';
import {isValidUrl} from './routes.js';




let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let  output = document.getElementById("container-outputs");
export let inputSearch = document.getElementById('input_search');

export function initRenderAllEvents()
{

    btn = document.querySelector('#btn');
    sidebar = document.querySelector('.sidebar');
    output = document.getElementById("container-outputs");
    inputSearch = document.getElementById('input_search');

    btn.onclick = function() {
        sidebar.classList.toggle('active'); 
    };   
}


export function renderAll() 
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
                        usernameIdProfile.value = "";//data.username;
                        emailIdProfile.value = "";//data.email;

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
        let send_image = "";//localStorage.getItem("photo");

        let file = null;
        if(fileInput)
        {
            fileInput.addEventListener("change", function(event) {
                file = event.target.files[0];
                if (file) 
                {
                    imgUpdate.src = URL.createObjectURL(file); // Efficient file preview
                }
            });
        }
        if(save)
        {
            save.addEventListener("click", function() 
            {

                    function updateLocalstorage(UserData) 
                    {
                        console.log("username", UserData.data.username);
                        console.log("email", UserData.data.email);
                        console.log("photo", UserData.data.photo);

                        if (UserData.data.username) localStorage.setItem('username', UserData.data.username);
                        if (UserData.data.email) localStorage.setItem('email', UserData.data.email);
                        // const path = "http://127.0.0.1:8000" + UserData.data.photo;
                        if (UserData.data.photo) localStorage.setItem('photo', "http://127.0.0.1:8000" + UserData.data.photo);
                    }
                    async function sendRequestUpdateProfile() {
                        console.log("hi mister karim")
                        let stateCheck;
                        if(checkBox.checked)
                            stateCheck = true;
                        else
                            stateCheck = false;
                        console.log(`{"username":"${usernameIdProfile.value}", "email":"${emailIdProfile.value}", "password":"${passwordIdProfile.value}", "repeat_password": "${passwordIdProfileConfirme.value}", "photo":"${send_image}", "is_2fa_enabled":"${stateCheck}"}`)

                        const username = usernameIdProfile.value;
                        const email = emailIdProfile.value;
                        const password = passwordIdProfile.value;
                        const repeat_password = passwordIdProfileConfirme.value;
                        const is_2fa_enabled = stateCheck;
                        let photo = send_image; 


                    const formData = new FormData();

                    if (username) formData.append("username", username);
                    if (email) formData.append("email", email);
                    if (password) formData.append("password", password);
                    if (repeat_password) formData.append("repeat_password", repeat_password);
                    formData.append("is_2fa_enabled", is_2fa_enabled);
                    if (file) formData.append("photo", file);

                    const UserData = {};

                    console.log("photo:", photo);
                    console.log("UserData=================: ", formData);

                    const is_upload = !!file;

                    let body;

                    if(is_upload)
                        body = formData;
                    else
                    {
                        if (username) UserData.username = username;
                        if (email) UserData.email = email;
                        if (password) UserData.password = password;
                        if (repeat_password) UserData.repeat_password = repeat_password;
                        UserData.is_2fa_enabled = is_2fa_enabled;
                        body = UserData;
                    }

                    if (!is_upload && Object.entries(UserData).length === 0) 
                        body = null;
                    console.log("uplaod::::::::: ", is_upload);
                    console.log("body::::::::: ", body);

                    const info = await SecureApiRequest("/api/update/profile/","PATCH", body, is_upload);
                    if (info && !info.error) 
                    {
                        console.log("localStorage updateeeeeed", info);

                        updateLocalstorage(info);

                        containerError.style.display = "block"
                        showError("Profile updated successfully", "error-message");
                    }
                    else
                    {

                        const data = info.error;
                        let errormessage = "";
                        for (const key in data) 
                            if (data[key]) 
                                errormessage += `${data[key]}`; 
                                    
                        containerError.style.display = "block"
                        showError(errormessage, "error-message");

                    }
                    photo = "";
            }
                    sendRequestUpdateProfile();
                    // containerError.style.display = "none"
                    // containerEdit.style.display = "none";
                    validForm = 0;
                    validPassword = 0;
                    usernameIdProfile.value = ""
                    emailIdProfile.value = ""
                    passwordIdProfile.value = ""
                    passwordIdProfileConfirme.value = ""
                    // stateCheck = None;
                // }

                });
        }


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

                            let photo = data.photo;
                                
                            if(!isValidUrl(photo))
                                photo = `http://127.0.0.1:8000${photo}`;

                            imgSearch.src = photo;
                            buttonFriend.style.display = "flex"
                            buttonFriend2.style.display = "none"
                            localStorage.setItem('eachProfileUserName', data.username);
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
                    let photo = data.photo;
                        
                    if(!isValidUrl(photo))
                    {
                        console.log("hello url is path:", isValidUrl(photo));
                        photo = `http://127.0.0.1:8000${photo}`;
                    }

                    usernameEachProfile.innerHTML = data.username;
                    usernameEachProfile2.innerHTML = data.username;
                    usernameEachProfile3.innerHTML = data.username;
                    emailEachProfile.innerHTML = data.email;
                    imageEachProfile.src = photo;
                    imageEachProfile2.src = photo;
                    imageEachProfile3.src = photo;
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
            while(i < info.friends.length)
            {
                if(info.friends[i].unsername == localStorage.getItem("username"))
                    valid = 1;
                i++;
            }
            if(valid == 1)
                addFriendButton.innerHTML = "Message"
            else
                addFriendButton.innerHTML = "Add Friend +"
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
        });
    }

}

