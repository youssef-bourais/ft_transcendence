import { routes, handleLocation} from './routes.mjs';


function togglePass(id_name) 
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


window.togglePass = togglePass;
// window.logout = logout;
window.addEventListener("popstate", handleLocation);

window.addEventListener("DOMContentLoaded", handleLocation);

