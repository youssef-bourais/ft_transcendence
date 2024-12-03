
import { handleLocation } from './app.js';

export function togglePass(id_name) 
{
    // console.log("hello");

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

export function logout() 
{
    // Remove the logged-in token
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    alert('Logged out! Access to /profile is restricted.');
    history.pushState({}, "", "/"); 
    handleLocation();

}

export function GoLogin()
{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    history.pushState({}, "", "/");
    handleLocation();

}


// <img src="invalid" onerror="alert('XSS')">
export function SanitizeInpute(str) 
{
    const div = document.createElement('div');
    const text = document.createTextNode(str);
    div.appendChild(text); // browser automaticly excape the tags in the text
    return div.innerHTML;
}

var timer = null;
export function showError(message) 
{
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
    var errorElement = document.getElementById("error");
    errorElement.innerHTML = message;
    errorElement.style.display = 'block';
    timer = setTimeout(function(){ errorElement.style.display = 'none'; }, 4000);
}

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    

const checkPasswordStrength = (inputPassword) => 
{
    if(strongPassword.test(inputPassword))
        return 'strong';
    else if(mediumPassword.test(inputPassword))
        return 'medium';
    else
        return 'weak';
}

function isEmptyOrSpaces(str)
{
    return str === null || str.match(/^ *$/) !== null;
}


export function validatePassword(password, password2, email) 
{

    if (password !== password2) 
        return "Passwords do not match!";
    if(password.length < 8)
        return "password must be at least 8 characters long";
    if(checkPasswordStrength(password) === 'weak')
        return "password very weak";
    if (isEmptyOrSpaces(email))
        return 'Email cannot be empty';
    return null;
}

export function getCookie(name) 
{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`); 
    if (parts.length === 2) 
        return parts.pop().split(';').shift();
}

export function deleteCookie(name) 
{
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}


