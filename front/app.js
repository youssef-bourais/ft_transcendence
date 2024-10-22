
function homeView() 
{
    return `
        <h2>Home View</h2>
        <p>Welcome to the Home Page!</p>
    `;
}

function aboutView() 
{
    return `
        <h2>About View</h2>
        <p>Learn more about us on this page.</p>
    `;
}

function contactView() 
{
    return `
        <h2>Contact View</h2>
        <p>Get in touch with us!</p>
    `;
}

function showView(view) 
{
    const container = document.getElementById('ele');
    
    switch(view) {
        case 'home':
            container.innerHTML = homeView();
            break;
        case 'about':
            container.innerHTML = aboutView();
            break;
        case 'contact':
            container.innerHTML = contactView();
            break;
        default:
            container.innerHTML = '<h2>404 - page not found</h2>';
    }
}

window.onload = () => {
    showView('home');
};

