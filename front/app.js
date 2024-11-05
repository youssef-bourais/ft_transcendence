
async function loadPage(page) 
{
    const content = document.getElementById('content');
    try 
    {
        const url = `pages/${page}.html`;
        // console.log(`Fetching URL: ${url}`);
        const response = await fetch(url);
        // console.log(`Response status: ${response.status}`);
        // console.log('response : ', response.ok);



        if (!response.ok) 
            throw new Error('Page not found');
        const html = await response.text();
        content.innerHTML = html;
        // console.log('content.innerHTML', content.innerHTML);

        loadCSS(`${page}.css`);
        
        if (page === 'login') 
            setupLoginPage();
        else if (page === 'profile') 
            setupProfilePage();
    } 
    catch (error) 
    {
        console.error('Error loading page:', error);
        content.innerHTML = "<p>Page not found.</p>";
    }
}

function loadCSS(filename) 
{
    const existingLink = document.querySelector('link[data-page-css]');
    if (existingLink) 
        existingLink.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `styles/${filename}`;
    link.setAttribute('data-page-css', 'true');
    document.head.appendChild(link);
}

function setupLoginPage() 
{
    const form = document.querySelector('.form');
    if (form) 
    {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Login form submitted');

            // Capture username and password
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log(`Username: ${username}, Password: ${password}`);

            // Validate credentials (for simplicity, using hardcoded values)
            if (username === 'user' && password === 'pass') 
            {
                console.log('Credentials match');
                loadPage('profile'); // Navigate to profile on successful login
            } 
            else 
            {
                console.log('Invalid credentials');
                alert('Invalid username or password');
            }
        });
    }
}

// function setupLoginPage() 
// {
//     const form = document.getElementById('form');
//     if (form) 
//     {
//         console.log("hello");
//         form.addEventListener('submit', (event) => {
//         event.preventDefault();
//         console.log('Login form submitted');
//         loadPage('profile'); // Navigate to profile on successful login
//         });
//     }
// }

function setupProfilePage() 
{
    console.log("Profile page loaded");
    alert("good trip");
}


document.addEventListener('DOMContentLoaded', () => 
{
    loadPage('login');
});
